import React from 'react';
import { Container } from '@mui/material';
import ActionsBar from './components/ActionsBar';
import Map from './components/Map/CanvasMap';
import ResultModal from './components/ResultModal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openCell, startGame } from './gameActions';
import { IMapCell } from './types';


export function Game() {
  const { level, systemMessage, map } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  const handleChangeLevel = (newLevel: string) => {
    dispatch(startGame(newLevel));
  };

  const restartGame = () => {
    dispatch(startGame(level));
  }

  const handleClickCell = (data: IMapCell) => {
    const { rowIndex, cellIndex } = data;
    dispatch(openCell({ 
      x: cellIndex,
      y: rowIndex
    }));
  }

  return (
    <div>
      <Container maxWidth={false}>
        <h1>Minesweeper</h1>
        <ActionsBar onChangeLevel={handleChangeLevel} level={level} />
        <Map gameMap={map} onOpenCell={handleClickCell} />
        <ResultModal onClose={restartGame} systemMessage={systemMessage} />
      </Container>
    </div>
  );
}