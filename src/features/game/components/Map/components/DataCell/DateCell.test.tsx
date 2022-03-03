import { render } from '@testing-library/react';
import DataCell, { LABEL_COLOR } from './index';

test('renders DataCell default component', async() => {
  const data = {
    rowIndex: 0,
    cellIndex: 0,
    type: '0'
  }
  const { getByTestId, queryAllByTestId } = render(
    <DataCell data={data} />
  );

  expect(getByTestId('DataCell')).toBeInTheDocument();
  const label = await queryAllByTestId('data-label');
  expect(label.length).toBe(0);
});

test('renders DataCell component with type', () => {
  const type = '2';
  const data = {
    rowIndex: 0,
    cellIndex: 0,
    type
  }
  const { getByTestId, getByText } = render(
    <DataCell data={data} />
  );

  const label = getByTestId('data-label');
  expect(label).toBeInTheDocument();
  expect(label.style.color).toBe(LABEL_COLOR[Number(type)]);
  expect(getByText(type)).toBeInTheDocument();
});
