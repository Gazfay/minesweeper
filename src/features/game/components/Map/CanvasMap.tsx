import { useCallback, useEffect, useRef, MouseEvent } from 'react';
import { makeStyles } from 'tss-react/mui';
import { usePrevious } from '../../../../app/hooks';
import { IMapCell } from '../../types';
import { LABEL_COLOR } from './components/DataCell';

interface IMap {
  gameMap: Array<IMapCell[]>;
  onOpenCell: (data: IMapCell) => void;
}

interface IDrawProps {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
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
  })
);

function Map({ gameMap, onOpenCell }: IMap) {
  const { classes } = useStyles();
  const cellSize = 20;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevGameMap = usePrevious(gameMap);

  const changeCanvasSize = useCallback((canvas: HTMLCanvasElement) => {
    //@ts-ignore
    if (!gameMap.length || gameMap.length === prevGameMap?.length) return;
    const height = gameMap.length * cellSize;
    const width = gameMap[0].length * cellSize;
    canvas.width = width;
    canvas.height = height;
  }, [gameMap, prevGameMap]);

  const drawBorder = ({ ctx, x, y }: IDrawProps) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0 0 0 / 25%)";
    ctx.rect(x, y, cellSize, cellSize);
    ctx.stroke();
  }

  const drawText = ({ ctx, x, y }: IDrawProps, type: string) => {
    ctx.font = '12px Roboto';
    const typeIndex = Number(type);
    const color = LABEL_COLOR[typeIndex];
    ctx.fillStyle = color;
    const cellCenter = cellSize / 2;
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillText(type, x + cellCenter, y + cellCenter);
  }

  const drawDefaultCell = useCallback((drawProps: IDrawProps) => {
    const { ctx, x, y } = drawProps;
    ctx.fillStyle = "#388E3C";
    ctx.fillRect(x, y, cellSize, cellSize);
    drawBorder(drawProps);
  }, []);

  const drawOpenedCell = useCallback((drawProps: IDrawProps, type: string) => {
    const { ctx, x, y } = drawProps;
    ctx.fillStyle = "#ccc";
    ctx.fillRect(x, y, cellSize, cellSize);
    drawBorder(drawProps);
    if (type !== '0') drawText(drawProps, type);
  }, []);

  const drawBombCell = useCallback((drawProps: IDrawProps) => {
    const { ctx, x, y } = drawProps;
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, cellSize, cellSize);
    drawBorder(drawProps);

    ctx.beginPath();
    const cellCenter = cellSize / 2;
    const radius = cellCenter - 5;
    ctx.arc(x + cellCenter, y + cellCenter, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.stroke();
  }, []);

  const drawMap = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!gameMap.length) return;
    gameMap.forEach((row: Array<IMapCell>) => {
      row.forEach(data => {
        const { type, cellIndex, rowIndex } = data;
        const x = cellIndex * cellSize;
        const y = rowIndex * cellSize;
        const drawProps = { ctx, x, y };

        if (!type) {
          drawDefaultCell(drawProps);
        } else if (type === '5') {
          drawBombCell(drawProps);
        } else {
          drawOpenedCell(drawProps, type);
        }
      });
    })
  }, [drawBombCell, drawDefaultCell, drawOpenedCell, gameMap]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    changeCanvasSize(canvas);
    if (ctx) drawMap(ctx);
  }, [changeCanvasSize, drawMap]);

  const handleOnClick = (event: MouseEvent) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rowsCount = gameMap.length;
    const columnCount = gameMap[0].length;
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rowIndex = Math.floor(y / (canvas.width / columnCount));
    const cellIndex = Math.floor(x / (canvas.height / rowsCount));
    const mapCell = gameMap[rowIndex][cellIndex];

    if (!mapCell.type) onOpenCell(mapCell);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <canvas
          onClick={handleOnClick}
          width={0}
          height={0}
          ref={canvasRef}
        />
      </div>
    </div>
  );
}

export default Map;