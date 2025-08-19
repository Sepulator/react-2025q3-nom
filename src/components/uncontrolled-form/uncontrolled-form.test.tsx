import { mockStore } from '@/__tests__/form-mock';
import { render, screen, waitFor } from '@/__tests__/test-utils';
import UncontrolledForm from '@/components/uncontrolled-form';

import * as utils from '@/utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/store', () => ({
  useFormStore: () => mockStore,
}));

describe('React hook form', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(utils, 'convertImageToBase64').mockResolvedValue('data:image/png;base64,mock');
  });

  it('renders all required fields', async () => {
    render(<UncontrolledForm />);

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByText(/gender/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/accept.*terms/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/picture/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/^male$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/female/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/other/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    });
  });

  it('shows name validation error', async () => {
    const { user } = render(<UncontrolledForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const nameInput = screen.getByLabelText(/name/i);

    await user.type(nameInput, 'invalid');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name must start with an uppercase letter/i)).toBeInTheDocument();
    });
  });

  it('shows age validation error', async () => {
    const { user } = render(<UncontrolledForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const ageInput = screen.getByLabelText(/age/i);
    await user.type(ageInput, '-1');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/age cannot be negative/i)).toBeInTheDocument();
    });
  });

  it('shows email validation error', async () => {
    const { user } = render(<UncontrolledForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const emailInput = screen.getByLabelText(/email/i);

    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email must be a valid email/i)).toBeInTheDocument();
    });
  });

  it('shows password validation errors', async () => {
    const { user } = render(<UncontrolledForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const passwordInput = screen.getByLabelText(/main-password/i);

    await user.type(passwordInput, 'weak');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password must contain at least 1 special character/i)).toBeInTheDocument();
    });
  });

  it('shows confirm password mismatch error', async () => {
    const { user } = render(<UncontrolledForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);

    await user.type(passwordInput, '!1Qwerty');
    await user.type(confirmInput, '!11Qwerty');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('shows terms acceptance error', async () => {
    const { user } = render(<UncontrolledForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('You must accept the terms and conditions')).toBeInTheDocument();
    });
  });

  it('submit button enabled by default', async () => {
    render(<UncontrolledForm />);

    expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled();
  });

  it('clears error when valid input is entered after submit', async () => {
    const { user } = render(<UncontrolledForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const nameInput = screen.getByLabelText(/name/i);

    await user.type(nameInput, 'invalid');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name must start with an uppercase letter/i)).toBeInTheDocument();
    });

    await user.clear(nameInput);
    await user.type(nameInput, 'Valid Name');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/name must start with an uppercase letter/i)).not.toBeInTheDocument();
    });
  });

  it('shows aria-invalid attribute on invalid fields', async () => {
    const { user } = render(<UncontrolledForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const nameInput = screen.getByLabelText(/name/i);

    await user.type(nameInput, 'invalid');
    await user.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
