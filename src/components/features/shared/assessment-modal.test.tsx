/**
 * AssessmentModal Tests - Story 2.9
 *
 * AC31: Centered modal with sparkle icon, assessment label,
 * description, "Take Action" CTA, and "Dismiss" link.
 */

import React from 'react';

import { fireEvent, render, screen } from '@/lib/test-utils';

import { AssessmentModal } from './assessment-modal';

describe('AssessmentModal', () => {
  const defaultProps = {
    visible: true,
    title: 'Potential Match Found',
    description: 'We found an image that may be you.',
    onAction: jest.fn(),
    onDismiss: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing when visible', () => {
    render(<AssessmentModal {...defaultProps} />);
    expect(true).toBe(true);
  });

  it('renders title', () => {
    render(<AssessmentModal {...defaultProps} />);
    expect(screen.getByText('Potential Match Found')).toBeTruthy();
  });

  it('renders description', () => {
    render(<AssessmentModal {...defaultProps} />);
    expect(screen.getByText('We found an image that may be you.')).toBeTruthy();
  });

  it('renders "Assessment" label', () => {
    render(<AssessmentModal {...defaultProps} />);
    expect(screen.getByText('Assessment')).toBeTruthy();
  });

  it('renders default action button label', () => {
    render(<AssessmentModal {...defaultProps} />);
    expect(screen.getByText('Take Action')).toBeTruthy();
  });

  it('renders custom action button label', () => {
    render(<AssessmentModal {...defaultProps} actionLabel="Review Now" />);
    expect(screen.getByText('Review Now')).toBeTruthy();
  });

  it('renders default dismiss label', () => {
    render(<AssessmentModal {...defaultProps} />);
    expect(screen.getByText('Dismiss')).toBeTruthy();
  });

  it('renders custom dismiss label', () => {
    render(<AssessmentModal {...defaultProps} dismissLabel="Skip" />);
    expect(screen.getByText('Skip')).toBeTruthy();
  });

  it('calls onAction when action button is pressed', () => {
    const onAction = jest.fn();
    render(<AssessmentModal {...defaultProps} onAction={onAction} />);

    const actionButton = screen.getByRole('button', { name: 'Take Action' });
    fireEvent.press(actionButton);

    expect(onAction).toHaveBeenCalled();
  });

  it('renders with testID', () => {
    render(<AssessmentModal {...defaultProps} testID="assessment-modal" />);
    expect(screen.getByTestId('assessment-modal')).toBeTruthy();
  });
});
