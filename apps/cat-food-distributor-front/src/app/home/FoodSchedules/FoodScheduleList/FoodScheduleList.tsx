import { Container, List, Typography } from '@mui/material';

interface FoodSchedulesProps {
  foodSchedules: React.ReactElement[];
}

export function FoodScheduleList({
                                   foodSchedules
                                 }: FoodSchedulesProps) {
  if (foodSchedules.length === 0) {
    return <Typography>No defined schedules</Typography>;
  }


  return (
    <Container>
      <List>
        {foodSchedules}
      </List>
    </Container>);
}
