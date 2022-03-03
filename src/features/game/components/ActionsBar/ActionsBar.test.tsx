import { render } from '@testing-library/react';
import ActionsBar from './index';

test('renders App component', () => {
  const { getByTestId, getByText } = render(
    <ActionsBar onChangeLevel={() => {}} level="1" />
  );

  expect(getByTestId('ActionsBar')).toBeInTheDocument();
  expect(getByText('1')).toBeInTheDocument();
});
