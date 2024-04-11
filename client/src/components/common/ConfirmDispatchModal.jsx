import React from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';

const ConfirmDispatchModal = ({ open, handleClose, handleDispatch, orderId }) => {

  const handleDispatchAndClose = async () => {
    await handleDispatch(orderId);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ 
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24, p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Dispatch Confirmation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to dispatch the order with ID: {orderId}?
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 3 }}>Cancel</Button>
          <Button onClick={handleDispatchAndClose} sx={{ mt: 3, ml: 2, bgcolor: 'success.main', color: '#fff', '&:hover': { bgcolor: 'success.dark' } }}>Dispatch</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ConfirmDispatchModal;
