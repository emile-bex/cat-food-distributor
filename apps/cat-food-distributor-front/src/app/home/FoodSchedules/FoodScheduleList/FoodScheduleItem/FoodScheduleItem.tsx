import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle, Delete, Edit, Unpublished } from '@mui/icons-material';
import { toString as cronToString } from 'cronstrue';
import { FoodSchedule } from '@cat-food-distributor/shared/food-schedules/data-access';

interface FoodScheduleProps {
  foodSchedule: FoodSchedule;
  onActivateClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export function FoodScheduleItem({ foodSchedule, onActivateClick, onEditClick, onDeleteClick } : FoodScheduleProps) {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton onClick={onEditClick}>
          <Edit />
        </IconButton>
          <IconButton onClick={onDeleteClick}>
            <Delete />
          </IconButton></>
      }>
      <ListItemIcon onClick={onActivateClick}>
        <IconButton>
          {foodSchedule.isActive ? <CheckCircle /> : <Unpublished />}
        </IconButton>
      </ListItemIcon>
      <ListItemText primary={cronToString(foodSchedule.cron)} />
      <ListItemText primary={foodSchedule.id} secondary={foodSchedule.distributorId} />
    </ListItem>
  );
}
