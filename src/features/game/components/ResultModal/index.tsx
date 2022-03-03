import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface IResultModal {
  systemMessage: string;
  onClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '1px solid #ccc',
  backgroundColor: 'white',
  boxShadow: 24,
  p: 4,
};

function ResultModal({ systemMessage, onClose }: IResultModal) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (systemMessage) {
      setOpen(true);
    }
  }, [systemMessage]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  }

  return (
    <div data-testid="ResultModal">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Game over
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2, mb: 5 }}>
              {systemMessage}
            </Typography>
            <Button variant="contained" onClick={handleClose}>OK</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ResultModal;