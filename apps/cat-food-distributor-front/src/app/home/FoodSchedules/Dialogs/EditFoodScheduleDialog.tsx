import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { DialogProps } from '@toolpad/core/useDialogs';

interface EditFoodScheduleDialogProps {
  id: string;
  cron: string;
}

export function EditFoodScheduleDialog({ open, onClose, payload }: DialogProps<EditFoodScheduleDialogProps, string | null>) {
  const [updatedCron, setUpdatedCron] = useState(payload.cron);

  return (
    <Dialog
      open={open}
      onClose={() => onClose(null)}
    >
      <DialogTitle>Edit schedule</DialogTitle>
      <DialogContent>
        <TextField
          onChange={(e) => {
            setUpdatedCron(e.target.value);
          }}
          autoFocus
          required
          margin="dense"
          id="cron"
          name="cron"
          label="Schedule"
          type="text"
          fullWidth
          variant="standard"
          value={updatedCron}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)}>Cancel</Button>
        <Button onClick={() => onClose(updatedCron)}>Update</Button>
      </DialogActions>
    </Dialog>
  );

}
