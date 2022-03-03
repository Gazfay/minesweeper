import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { startGame, endGameTotal } from './gameActions';
import { IMapCell, StartGameType } from './types';

export interface GameState {
  isStarted: boolean;
  isEnded: boolean;
  level: string;
  map: Array<IMapCell[]>;
  systemMessage: string;
}

const initialState: GameState = {
  isStarted: false,
  isEnded: false,
  level: '1',
  map: [],
  systemMessage: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<Array<IMapCell[]>>) => {
      state.map = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startGame, (state, action: PayloadAction<StartGameType>) => {
        state.isStarted = true;
        state.isEnded = false;
        state.level = action.payload ?? state.level;
        state.systemMessage = '';
      });
    builder
      .addCase(endGameTotal, (state, action: PayloadAction<string>) => {
        state.isStarted = false;
        state.isEnded = true;
        state.systemMessage = action.payload;
      });
  },
});

export const { setMap } = gameSlice.actions;
export default gameSlice.reducer;
