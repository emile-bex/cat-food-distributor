import { useAppDispatch, useAppSelector } from '@cat-food-distributor/shared/data-access/store';
import {
  FoodSchedule,
  foodSchedulesActions,
  foodSchedulesSelectors
} from '@cat-food-distributor/shared/food-schedules/data-access';
import { useCallback, useEffect } from 'react';
import { useDialogs } from '@toolpad/core/useDialogs';
import { EditFoodScheduleDialog } from './Dialogs/EditFoodScheduleDialog';

export function useFoodSchedules() {
  const dispatch = useAppDispatch();
  const dialogs = useDialogs();

  const isLoading = useAppSelector(foodSchedulesSelectors.selectIsLoading);
  const error = useAppSelector(foodSchedulesSelectors.selectError);
  const foodSchedules = useAppSelector(foodSchedulesSelectors.selectFoodSchedules);

  useEffect(() => {
    if (!foodSchedules) {
      dispatch(foodSchedulesActions.findAllFoodSchedulesRequested());
    }
  }, [dispatch, foodSchedules]);

  const toggleFoodSchedule = useCallback((id: string, isActive: boolean) => {
    dispatch(foodSchedulesActions.updateFoodScheduleRequested({ id, isActive: !isActive }));
  }, [dispatch]);

  const updateFoodSchedule = useCallback(async (id: string, cron: string) => {
    const updatedCron = await dialogs.open(EditFoodScheduleDialog, {
      id,
      cron,
    });

    if(updatedCron) {
      dispatch(foodSchedulesActions.updateFoodScheduleRequested({ id, cron: updatedCron }));
    }

  }, [dialogs, dispatch]);

  const deleteFoodSchedule = useCallback(async (id: string) => {
    const confirmed = await dialogs.confirm(`Are you sure you want to delete schedule ${id}?`, {
      okText: 'Delete',
      cancelText: 'Cancel',
    });
    if (confirmed) {
      dispatch(foodSchedulesActions.deleteFoodScheduleRequested({ id }));
    }
  }, [dialogs, dispatch]);

  return { foodSchedules, toggleFoodSchedule, updateFoodSchedule, deleteFoodSchedule, isLoading, error };
}
