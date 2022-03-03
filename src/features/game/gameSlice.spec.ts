import { endGameTotal, startGame } from './gameActions';
import gameReducer, {
  GameState,
  setMap
} from './gameSlice';

describe('counter reducer', () => {
  const initialState: GameState = {
    isStarted: false,
    isEnded: false,
    level: '1',
    map: [],
    systemMessage: '',
  };
  it('should handle initial state', () => {
    expect(gameReducer(undefined, { type: 'unknown' })).toEqual({
      isStarted: false,
      isEnded: false,
      level: '1',
      map: [],
      systemMessage: '',
    });
  });

  it('should handle setMap', () => {
    const map = [
      [{
        rowIndex: 0,
        cellIndex: 0,
        type: null,
      }, {
        rowIndex: 0,
        cellIndex: 0,
        type: '1',
      }]
    ];
    const actual = gameReducer(initialState, setMap(map));
    expect(actual.map).toEqual(map);
  });

  it('should handle startGame without params', () => {
    const actual = gameReducer(initialState, startGame());
    expect(actual.level).toEqual('1');
  });

  it('should handle startGame 2 level', () => {
    const actual = gameReducer(initialState, startGame('2'));
    expect(actual.level).toEqual('2');
    expect(actual.isStarted).toEqual(true);
    expect(actual.isEnded).toEqual(false);
  });

  it('should handle startGame 2 level', () => {
    const actual = gameReducer(initialState, startGame('2'));
    expect(actual.level).toEqual('2');
  });

  it('should handle startGame 2 level', () => {
    const message = 'Test message';
    const actual = gameReducer(initialState, endGameTotal(message));
    expect(actual.systemMessage).toEqual(message);
  });
});
