import { render } from '@testing-library/react';
import BombCell from './index';

test('renders BombCell component', () => {
  const { getByTestId } = render(
    <BombCell/>
  );

  expect(getByTestId('BombCell')).toBeInTheDocument();
});
