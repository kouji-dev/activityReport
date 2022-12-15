import { ActivityReportSelectionActions } from "activity-report/store/activity-report-sheet-selection.state";
import { sheetModeSelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import {
  RowCellIdentifiers,
  SheetMode,
} from "activity-report/timesheet/common-types";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
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
  const sheetMode = useSelector(sheetModeSelector);
  const sheetModeRef = useRef<SheetMode>(sheetMode);

  useEffect(() => {
    sheetModeRef.current = sheetMode;
  }, [sheetMode]);

  const startDrag = useCallback(() => {
    console.log(sheetModeRef.current);
    dispatch(ActivityReportSelectionActions.startDrag(payload));
  }, []);

  const onSelecting = useCallback(
    (ctrl: boolean) => {
      dispatch(
        ActivityReportSelectionActions.onSelecting({ ...payload, ctrl })
      );
    },
    [payload.rowKey, payload.activityReportId, payload.day]
  );

  const endDrag = useCallback(() => {
    dispatch(ActivityReportSelectionActions.endDrag(payload));
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
