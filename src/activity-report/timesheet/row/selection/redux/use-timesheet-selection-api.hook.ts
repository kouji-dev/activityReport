import { useCallback } from "react";
import { useDispatch } from "../../../../../store";
import { TimesheetSelectionApi } from "../context/timesheet-selection.context";
import { ActivityReportSelectionActions } from "../../../../store/activity-report-sheet-selection.state";

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

  const api: TimesheetSelectionApi = {
    startDrag,
    onMove,
    endDrag,
  };

  return api;
};
