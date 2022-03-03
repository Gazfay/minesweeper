import { take, fork, put, call } from 'redux-saga/effects'
import { EventChannel, eventChannel } from 'redux-saga';
import { startGame, openCell, endGameTotal } from './gameActions';
import { setMap } from './gameSlice';
import { ISocketResult } from './types';

const parseGameMap = (rows: string[]) => {
  return rows.map((row, rowIndex) => {
    let preparedRow = row.split('').map((symbol, cellIndex) => {
      let type: undefined | null | string = undefined;
      if (symbol === '□') type = null;
      if (symbol === '*') type = '5';
      if (!isNaN(Number(symbol))) type = String(symbol);

      return {
        rowIndex,
        cellIndex,
        type,
      }
    });

    return preparedRow;
  });
}

function createWebSocketConnection(): Promise<WebSocket> {
  const socket = new WebSocket('wss://hometask.eg1236.com/game1/');

  return new Promise(resolve => {
    socket.onopen = () => {
      resolve(socket);
      console.log("Socket connected");
    }

    socket.onerror = (error) => {
      console.log('WebSocket error ' + error);
    }
  });
}

function createSocketChannel(socket: WebSocket) {
  return eventChannel(emit => {
    const messageHandler = ({ data }: MessageEvent<string>) => {
      if (/^open: You lose/.test(data)) {
        const result = 'You lose. Try again?';
        emit({ type: 'end', result });
      }

      if (/^open: You win/.test(data)) {
        const result = 'You win. Try again?';
        emit({ type: 'end', result });
      }

      if (/^map:/.test(data)) {
        let message = data.replace('map:', '');
        let rows = message.trim().split(/\n/);
        let result = parseGameMap(rows);
        emit({ type: 'map', result });
      }
    }
    
    const errorHandler = (error: any) => {
      emit(new Error(error.reason));
    }
    
    socket.onmessage = messageHandler;
    socket.onerror = errorHandler;

    const unsubscribe = () => {
      socket.close();
    }

    return unsubscribe
  });
}

function* watchOnStartGame(socket: WebSocket) {
  while (true) {
    const { payload }: ReturnType<typeof startGame> = yield take(startGame.type);
    socket.send(`new ${payload}`);
    socket.send('map');
  }
}

function* watchOnOpenCell(socket: WebSocket) {
  while (true) {
    const { payload }: ReturnType<typeof openCell> = yield take(openCell.type);
    const { x, y } = payload;
    socket.send(`open ${x} ${y}`);
    socket.send('map');
  }
}

export function* gameSaga() {
  const socket: WebSocket = yield call(createWebSocketConnection);
  const socketChannel: EventChannel<string> = yield call(createSocketChannel, socket);
  yield fork(watchOnStartGame, socket);
  yield fork(watchOnOpenCell, socket);
  yield put(startGame('1'));

  while (true) {
    try {
      const { type, result }: ISocketResult = yield take(socketChannel);
      switch (type) {
        case 'map':
          yield put(setMap(result));
          break;
        case 'end':
          yield put(endGameTotal(result));
          break;
        default:
          break;
      }
    } catch(err) {
      console.error('socket error:', err);
      socketChannel.close();
    }
  }
}