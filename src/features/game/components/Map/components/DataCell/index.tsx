import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { IMapCell } from '../../../../types';

export const LABEL_COLOR = ['#fff', '#000', 'green', 'blue', 'red'];

interface IDataCell {
  data: IMapCell;
}

const useStyles = makeStyles()(
  () => ({
    container: {
      background: '#ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    label: {
      fontSize: '12px',
      fontWeight: 'bold',
    }
  })
);

function DataCell({ data }: IDataCell) {
  const { classes } = useStyles();
  const { type } = data;

  const renderLabel = () => {
    if (type === '0') return null;
    const typeIndex = Number(type);
    const color = LABEL_COLOR[typeIndex];
    return (
      <span
        className={classes.label}
        style={{ color }}
        data-testid="data-label"
      >
        {type}
      </span>
    );
  }

  return (
    <div className={classes.container} data-testid="DataCell">
      {renderLabel()}
    </div>
  )
}

export default DataCell;