import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

interface IActionsBar {
  onChangeLevel: (level: string) => void;
  level: string;
}

const useStyles = makeStyles()(
  () => ({
    container: {
      display: 'flex',
    },
    button: {
      marginRight: '15px'
    },
    selectWrapper: {
      maxWidth: '150px',
      flex: 1,
    }
  })
);

function ActionsBar({ onChangeLevel, level }: IActionsBar) {
  const { classes } = useStyles();

  const handleChange = (event: SelectChangeEvent) => {
    const newLevel = event.target.value as string;
    onChangeLevel(newLevel);
  };

  return (
    <div className={classes.container} data-testid="ActionsBar">
      <div className={classes.selectWrapper}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select level</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level}
            label="Select level"
            onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default ActionsBar;