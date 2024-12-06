import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle, Delete, Edit, Unpublished } from '@mui/icons-material';
import { toString as cronToString } from 'cronstrue';
import { FoodSchedule } from '@cat-food-distributor/shared/food-schedules/data-access';

interface FoodScheduleProps {
  foodSchedule: FoodSchedule;
  onActivateClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export function FoodScheduleItem({ foodSchedule, onActivateClick, onEditClick, onDeleteClick }: FoodScheduleProps) {
  return (
    <ListItem>
      <ListItemButton onClick={onActivateClick}>
        <ListItemIcon>
          {foodSchedule.isActive ? <CheckCircle /> : <Unpublished />}
        </ListItemIcon>
      </ListItemButton>
      <ListItemText primary={cronToString(foodSchedule.cron)} />
      <ListItemText primary={foodSchedule.id} secondary={foodSchedule.distributorId} />
      <ListItemButton onClick={onEditClick}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
      </ListItemButton>
      <ListItemButton onClick={onDeleteClick}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}
