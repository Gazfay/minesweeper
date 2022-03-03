import { render, screen } from '@testing-library/react';
import ResultModal from './index';
import userEvent from '@testing-library/user-event';

test('renders ResultModal component', () => {
  const { getByTestId } = render(
    <ResultModal onClose={() => {}} systemMessage="" />
  );

  expect(getByTestId('ResultModal')).toBeInTheDocument();
});

test('open/close ResultModal with message', () => {
  const message = 'Test message';
  const mockCallback = jest.fn();
  render(
    <ResultModal onClose={mockCallback} systemMessage={message} />
  );

  expect(screen.getByText(message)).toBeInTheDocument();
  const okButton = screen.getByText('OK');
  userEvent.click(okButton);
  expect(mockCallback).toHaveBeenCalledTimes(1);
});
