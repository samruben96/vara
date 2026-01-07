/**
 * Reverse Image Search Edge Function
 *
 * Secure proxy to SerpAPI for reverse image search.
 * Keeps API key secure on server side.
 *
 * Flow:
 * 1. Validate JWT from Authorization header
 * 2. Get signed URL for uploaded image from Supabase Storage
 * 3. Call SerpAPI with the image URL
 * 4. Transform and return results
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.0';

const SERPAPI_KEY = Deno.env.get('SERPAPI_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

interface RequestBody {
  imagePath: string;
}

interface SerpAPIResult {
  position?: number;
  thumbnail?: string;
  original?: string;
  source?: string;
  title?: string;
  link?: string;
  snippet?: string;
}

interface ScanResult {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  sourceUrl: string;
  sourceDomain: string;
  title: string;
  snippet?: string;
  foundAt: string;
}

// CORS headers for React Native
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Validate environment variables
    if (!SERPAPI_KEY) {
      throw new Error('SERPAPI_KEY not configured');
    }
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      throw new Error('Supabase configuration missing');
    }

    // Verify auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase admin client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Verify JWT and get user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { imagePath }: RequestBody = await req.json();

    if (!imagePath) {
      return new Response(
        JSON.stringify({ error: 'imagePath is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing reverse image search for user ${user.id}, image: ${imagePath}`);

    // Get signed URL for the image (valid for 1 hour)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from('user-photos')
      .createSignedUrl(imagePath, 3600);

    if (urlError || !signedUrlData?.signedUrl) {
      console.error('Storage error:', urlError);
      throw new Error('Failed to get image URL from storage');
    }

    console.log('Got signed URL, calling SerpAPI...');

    // Call SerpAPI reverse image search
    const serpApiUrl = new URL('https://serpapi.com/search.json');
    serpApiUrl.searchParams.set('engine', 'google_reverse_image');
    serpApiUrl.searchParams.set('image_url', signedUrlData.signedUrl);
    serpApiUrl.searchParams.set('api_key', SERPAPI_KEY);

    const serpResponse = await fetch(serpApiUrl.toString());

    if (!serpResponse.ok) {
      const errorText = await serpResponse.text();
      console.error('SerpAPI error:', serpResponse.status, errorText);
      throw new Error(`SerpAPI request failed: ${serpResponse.status}`);
    }

    const serpData = await serpResponse.json();

    console.log(`SerpAPI returned ${serpData.image_results?.length || 0} results`);

    // Transform results to our format
    const results: ScanResult[] = (serpData.image_results || []).map(
      (item: SerpAPIResult, index: number) => {
        let sourceDomain = '';
        try {
          sourceDomain = new URL(item.link || '').hostname;
        } catch {
          sourceDomain = 'Unknown';
        }

        return {
          id: `result-${index}-${Date.now()}`,
          imageUrl: item.original || item.thumbnail || '',
          thumbnailUrl: item.thumbnail || '',
          sourceUrl: item.link || '',
          sourceDomain,
          title: item.title || 'Untitled',
          snippet: item.snippet,
          foundAt: new Date().toISOString(),
        };
      }
    );

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        results,
        totalFound: results.length,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Reverse image search error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        results: [],
        totalFound: 0,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
