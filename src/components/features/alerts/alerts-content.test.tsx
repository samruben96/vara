import { render, screen } from '@/lib/test-utils';

import { AlertsContent } from './alerts-content';

describe('AlertsContent', () => {
  it('renders without crashing', () => {
    render(<AlertsContent />);
    expect(screen.getByText('Recent Alerts')).toBeTruthy();
  });

  it('displays the section header', () => {
    render(<AlertsContent />);
    expect(screen.getByRole('header', { name: 'Recent Alerts' })).toBeTruthy();
  });

  it('renders the alert list with mock alerts', () => {
    render(<AlertsContent />);
    // The mock data has 5 alerts
    expect(screen.getByLabelText(/Alerts list with 5 alerts/)).toBeTruthy();
  });

  it('displays alert titles from mock data', () => {
    render(<AlertsContent />);
    expect(screen.getByText('Image found on dating site')).toBeTruthy();
    expect(screen.getByText('Email in data breach')).toBeTruthy();
    expect(
      screen.getByText('Social media impersonation detected')
    ).toBeTruthy();
  });

  it('displays various severity levels', () => {
    render(<AlertsContent />);
    // Check for severity badges - they render the severity text
    expect(screen.getByText('Critical')).toBeTruthy();
    expect(screen.getAllByText('High').length).toBeGreaterThan(0);
    expect(screen.getByText('Medium')).toBeTruthy();
    expect(screen.getByText('Low')).toBeTruthy();
  });
});
