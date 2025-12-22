import type { AlertStatus } from '@/components/ui/alert-card';
import type { SeverityLevel } from '@/components/ui/severity-badge';

export interface AlertData {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  timestamp: Date;
  status: AlertStatus;
}

export const mockAlerts: AlertData[] = [
  {
    id: '1',
    title: 'Image found on dating site',
    description: 'Your photo appears on an unauthorized profile on Bumble',
    severity: 'high',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    status: 'new',
  },
  {
    id: '2',
    title: 'Email in data breach',
    description: 'Your email was found in the LinkedIn 2021 breach',
    severity: 'medium',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    status: 'viewed',
  },
  {
    id: '3',
    title: 'Social media impersonation detected',
    description: 'A fake Instagram account is using your photos and identity',
    severity: 'critical',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    status: 'new',
  },
  {
    id: '4',
    title: 'Phone number exposed',
    description: 'Your phone number was found in a public data dump',
    severity: 'low',
    timestamp: new Date(Date.now() - 604800000), // 1 week ago
    status: 'resolved',
  },
  {
    id: '5',
    title: 'Potential deepfake detected',
    description: 'AI analysis flagged suspicious image manipulation',
    severity: 'high',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    status: 'new',
  },
];
