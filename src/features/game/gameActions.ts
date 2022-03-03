import { createAction } from "@reduxjs/toolkit";
import { IOpenCell, StartGameType } from "./types";

export const startGame = createAction<StartGameType>('game/startGame');
export const openCell = createAction<IOpenCell>('game/openCell');
export const endGame = createAction<string>('game/endGame');
export const endGameTotal = createAction<string>('game/endGameTotal');