import { makeStyles } from 'tss-react/mui';
import { IMapCell } from '../../../../types';
import BombCell from '../BombCell';
import DataCell from '../DataCell';

interface IMapCellProps {
  data: IMapCell
  onOpenCell: (data: IMapCell) => void;
}

const useStyles = makeStyles()(
  () => ({
    container: {
      width: '15px',
      height: '15px',
      background: '#388E3C',
      display: 'flex',
      border: '0.5px solid rgb(0 0 0 / 25%)',
    },
  })
);

function MapCell({ data, onOpenCell }: IMapCellProps) {
  const { type } = data;
  const { classes } = useStyles();

  const renderContent = () => {
    if (!type) return null;
    if (type === '5') return <BombCell />;
    return <DataCell data={data} />
  }

  const handleClickOnCell = () => {
    if (!type) onOpenCell(data);
  }

  return (
    <div
      className={classes.container}
      onClick={handleClickOnCell}
      data-testid="MapCell"
    >
      {renderContent()}
    </div>
  );
}

export default MapCell;