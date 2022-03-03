import { render } from '@testing-library/react';
import Map from './index';

test('renders Map component', () => {
  const map = [[{
    rowIndex: 0,
    cellIndex: 0,
    type: null,
  }, {
    rowIndex: 0,
    cellIndex: 1,
    type: '1',
  }]]
  const { getByTestId, getAllByTestId } = render(
    <Map gameMap={map} onOpenCell={() => {}} />
  );

  expect(getByTestId('Map')).toBeInTheDocument();
  expect(getAllByTestId('MapCell').length).toBe(2);
});
