import { ActivityReportSelectionActions } from "activity-report/store/activity-report-sheet-selection.state";
import {
  endDragThunk,
  startDragThunk,
} from "activity-report/store/thunks/activity-report-sheet-selection.thunks";
import { RowCellIdentifiers } from "activity-report/timesheet/common-types";
import { useCallback, useMemo } from "react";
import { useDispatch } from "store";

export type TimesheetSelectionApi = {
  startDrag: () => void;
  onSelecting: (ctrl: boolean) => void;
  endDrag: () => void;
  isHolidingCtrl: (ctrl: boolean) => void;
};

export const useTimesheetSelectionApi: (
  payload: RowCellIdentifiers
) => TimesheetSelectionApi = (payload: RowCellIdentifiers) => {
  const dispatch = useDispatch();

  const startDrag = useCallback(() => {
    dispatch(startDragThunk(payload));
  }, []);

  const onSelecting = useCallback(
    (ctrl: boolean) => {
      dispatch(
        ActivityReportSelectionActions.onSelecting({
          ...payload,
          ctrl,
        })
      );
    },
    [payload.rowKey, payload.activityReportId, payload.day]
  );

  const endDrag = useCallback(() => {
    dispatch(endDragThunk(payload));
  }, []);

  const isHolidingCtrl = useCallback((ctrl: boolean) => {
    dispatch(ActivityReportSelectionActions.isHolidingCtrl(ctrl));
  }, []);

  const api: TimesheetSelectionApi = useMemo(
    () => ({
      startDrag,
      onSelecting,
      endDrag,
      isHolidingCtrl,
    }),
    []
  );

  return api;
};
