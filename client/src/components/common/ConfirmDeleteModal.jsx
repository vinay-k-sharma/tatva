import React from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';

export default function ConfirmDeleteModal({ open, handleClose, handleDelete, itemId }) {
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
            Delete Confirmation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete the item with ID: {itemId}?
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 3 }}>Cancel</Button>
          <Button onClick={() => handleDelete(itemId)} sx={{ mt: 3, ml: 2, bgcolor: 'error.main', color: '#fff', '&:hover': { bgcolor: 'error.dark' } }}>Delete</Button>
        </Box>
      </Modal>
    </div>
  );
}
