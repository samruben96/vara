import { fireEvent, render, screen } from '@/lib/test-utils';

import { AlertList } from './alert-list';
import type { AlertData } from './mock-data';

const mockAlerts: AlertData[] = [
  {
    id: '1',
    title: 'Test Alert 1',
    description: 'Description 1',
    severity: 'high',
    timestamp: new Date(),
    status: 'new',
  },
  {
    id: '2',
    title: 'Test Alert 2',
    description: 'Description 2',
    severity: 'low',
    timestamp: new Date(),
    status: 'viewed',
  },
];

describe('AlertList', () => {
  it('renders with alerts', () => {
    render(<AlertList alerts={mockAlerts} />);
    expect(screen.getByLabelText(/Alerts list with 2 alerts/)).toBeTruthy();
  });

  it('renders all alert titles', () => {
    render(<AlertList alerts={mockAlerts} />);
    expect(screen.getByText('Test Alert 1')).toBeTruthy();
    expect(screen.getByText('Test Alert 2')).toBeTruthy();
  });

  it('renders alert descriptions', () => {
    render(<AlertList alerts={mockAlerts} />);
    expect(screen.getByText('Description 1')).toBeTruthy();
    expect(screen.getByText('Description 2')).toBeTruthy();
  });

  it('fires onAlertPress callback when alert is pressed', () => {
    const onAlertPress = jest.fn();
    render(<AlertList alerts={mockAlerts} onAlertPress={onAlertPress} />);

    // AlertCard with onPress becomes a button
    const firstAlert = screen.getAllByRole('button')[0];
    fireEvent.press(firstAlert);

    expect(onAlertPress).toHaveBeenCalledWith('1');
  });

  it('renders empty list when no alerts provided', () => {
    render(<AlertList alerts={[]} />);
    expect(screen.getByLabelText(/Alerts list with 0 alerts/)).toBeTruthy();
  });
});
