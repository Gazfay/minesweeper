import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MapCell from './index';

test('renders MapCell component', () => {
  const data = {
    rowIndex: 0,
    cellIndex: 0,
    type: null
  }
  const { getByTestId } = render(
    <MapCell data={data} onOpenCell={() => {}} />
  );

  expect(getByTestId('MapCell')).toBeInTheDocument();
});

test('renders MapCell component with normal type', () => {
  const data = {
    rowIndex: 0,
    cellIndex: 0,
    type: '1'
  }
  const { getByTestId } = render(
    <MapCell data={data} onOpenCell={() => {}} />
  );

  expect(getByTestId('DataCell')).toBeInTheDocument();
});

test('renders MapCell component with bomb type', () => {
  const data = {
    rowIndex: 0,
    cellIndex: 0,
    type: '5'
  }
  const { getByTestId } = render(
    <MapCell data={data} onOpenCell={() => {}} />
  );

  expect(getByTestId('BombCell')).toBeInTheDocument();
});

test('renders MapCell component without type', () => {
  const data = {
    rowIndex: 0,
    cellIndex: 0,
    type: null,
  }
  const { getByTestId } = render(
    <MapCell data={data} onOpenCell={() => {}} />
  );

  const component = getByTestId('MapCell');
  expect(component.firstChild).toBeNull();
});

test('open cell in MapCell', () => {
  const data = {
    rowIndex: 0,
    cellIndex: 0,
    type: null
  }
  const mockCallback = jest.fn();
  render(
    <MapCell data={data} onOpenCell={mockCallback} />
  );

  const cell = screen.getByTestId('MapCell');
  userEvent.click(cell);
  expect(mockCallback).toHaveBeenCalledWith(data);
});

test('try open cell in MapCell', () => {
  const data = {
    rowIndex: 0,
    cellIndex: 0,
    type: '1',
  }
  const mockCallback = jest.fn();
  render(
    <MapCell data={data} onOpenCell={mockCallback} />
  );

  const cell = screen.getByTestId('MapCell');
  userEvent.click(cell);
  expect(mockCallback).not.toHaveBeenCalled();
});
