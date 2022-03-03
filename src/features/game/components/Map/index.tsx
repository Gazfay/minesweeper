import React from 'react';
import { makeStyles } from 'tss-react/mui';
import MapCell from './components/MapCell';
import { IMapCell } from '../../types';

interface IMap {
  gameMap: Array<IMapCell[]>;
  onOpenCell: (data: IMapCell) => void;
}

const useStyles = makeStyles()(
  () => ({
    container: {
      maxWidth: '100%',
      overflow: 'auto',
      marginTop: '10px',
    },
    wrapper: {
      display: 'inline-flex',
      flexDirection: 'column',
      border: '0.5px solid rgb(0 0 0 / 25%)',
      overflow: 'auto',
      flex: 1,
    },
    row: {
      display: 'inline-flex',
      flexGrow: 0,
    },
  })
);

function Map({ gameMap, onOpenCell }: IMap) {
  const { classes } = useStyles();

  return (
    <div className={classes.container} data-testid="Map">
      <div className={classes.wrapper}>
        {gameMap.map((row: Array<IMapCell>, index: number) => {
          return (
            <div key={index} className={classes.row}>
              {row.map(data => (
                <MapCell
                  key={`${data.rowIndex}-${data.cellIndex}`}
                  onOpenCell={onOpenCell}
                  data={data}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Map;