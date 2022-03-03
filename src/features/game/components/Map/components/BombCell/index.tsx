import React from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(
  () => ({
    container: {
      background: 'red',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    bomb: {
      width: '11px',
      height: '11px',
      background: 'black',
      borderRadius: '50%',
    }
  })
);

function BombCell() {
  const { classes } = useStyles();
  return (
    <div className={classes.container} data-testid="BombCell">
      <div className={classes.bomb} />
    </div>
  )
}

export default BombCell;