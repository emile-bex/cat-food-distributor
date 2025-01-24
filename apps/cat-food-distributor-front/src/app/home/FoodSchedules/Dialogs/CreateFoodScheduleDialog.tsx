import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { DialogProps } from '@toolpad/core/useDialogs';
import { CronSelector } from '../../../components/CronSelector';

export function CreateFoodScheduleDialog({ open, onClose }: DialogProps<undefined, string | null>) {
  const [newCron, setNewCron] = useState('');

  return (
    <Dialog
      open={open}
      onClose={() => onClose(null)}
    >
      <DialogTitle>Create schedule</DialogTitle>
      <DialogContent>
        <CronSelector value={newCron} setValue={setNewCron} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)}>Cancel</Button>
        <Button onClick={() => onClose(newCron)}>Update</Button>
      </DialogActions>
    </Dialog>
  );

}
