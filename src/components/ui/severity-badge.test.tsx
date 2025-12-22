import React from 'react';

import { render, screen } from '@/lib/test-utils';

import { SeverityBadge } from './severity-badge';

describe('SeverityBadge', () => {
  it('renders with low severity', () => {
    render(<SeverityBadge severity="low" />);
    expect(screen.getByLabelText('Severity: Low')).toBeTruthy();
    expect(screen.getByText('Low')).toBeTruthy();
  });

  it('renders with medium severity', () => {
    render(<SeverityBadge severity="medium" />);
    expect(screen.getByLabelText('Severity: Medium')).toBeTruthy();
    expect(screen.getByText('Medium')).toBeTruthy();
  });

  it('renders with high severity', () => {
    render(<SeverityBadge severity="high" />);
    expect(screen.getByLabelText('Severity: High')).toBeTruthy();
    expect(screen.getByText('High')).toBeTruthy();
  });

  it('renders with critical severity', () => {
    render(<SeverityBadge severity="critical" />);
    expect(screen.getByLabelText('Severity: Critical')).toBeTruthy();
    expect(screen.getByText('Critical')).toBeTruthy();
  });

  it('renders with small size', () => {
    render(<SeverityBadge severity="low" size="sm" />);
    expect(screen.getByText('Low')).toBeTruthy();
  });

  it('renders with medium size (default)', () => {
    render(<SeverityBadge severity="low" size="md" />);
    expect(screen.getByText('Low')).toBeTruthy();
  });

  it('has correct accessibility role', () => {
    render(<SeverityBadge severity="high" />);
    const element = screen.getByLabelText('Severity: High');
    expect(element.props.accessibilityRole).toBe('text');
  });

  it('renders all severity levels correctly', () => {
    const severities = ['low', 'medium', 'high', 'critical'] as const;

    severities.forEach((severity) => {
      const { unmount } = render(<SeverityBadge severity={severity} />);
      const expectedLabel =
        severity.charAt(0).toUpperCase() + severity.slice(1);
      expect(screen.getByText(expectedLabel)).toBeTruthy();
      unmount();
    });
  });

  it('renders all sizes correctly', () => {
    const sizes = ['sm', 'md'] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<SeverityBadge severity="low" size={size} />);
      expect(screen.getByText('Low')).toBeTruthy();
      unmount();
    });
  });
});
