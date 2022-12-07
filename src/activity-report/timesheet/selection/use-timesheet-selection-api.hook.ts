import { ActivityReportSelectionActions } from "activity-report/store/activity-report-sheet-selection.state";
import { useCallback, useMemo } from "react";
import { useDispatch } from "store";

export type TimesheetSelectionApi = {
  startDrag: () => void;
  onMove: () => void;
  endDrag: () => void;
};

export const useTimesheetSelectionApi: (
  key: string
) => TimesheetSelectionApi = (key: string) => {
  const dispatch = useDispatch();

  const startDrag = useCallback(() => {
    dispatch(ActivityReportSelectionActions.startDrag(key));
  }, []);

  const onMove = useCallback(() => {
    dispatch(ActivityReportSelectionActions.onMove(key));
  }, [key]);

  const endDrag = useCallback(() => {
    dispatch(ActivityReportSelectionActions.endDrag(key));
  }, []);

  const api: TimesheetSelectionApi = useMemo(
    () => ({
      startDrag,
      onMove,
      endDrag,
    }),
    []
  );

  return api;
};
