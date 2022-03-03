import { fork } from "redux-saga/effects";
import { gameSaga } from '../features/game/gameSaga';

export default function* rootSaga() {
  yield fork(gameSaga);
}