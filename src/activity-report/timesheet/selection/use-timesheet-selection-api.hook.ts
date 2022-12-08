import { ActivityReportSelectionActions } from "activity-report/store/activity-report-sheet-selection.state";
import { useCallback, useMemo } from "react";
import { useDispatch } from "store";
import { RowCellIdentifiers } from "../common-types";

export type TimesheetSelectionApi = {
  startDrag: () => void;
  onSelecting: (ctrl: boolean) => void;
  onMove: () => void;
  onRangeMove: () => void;
  endDrag: () => void;
  isHolidingCtrl: (ctrl: boolean) => void;
};

export const useTimesheetSelectionApi: (
  payload: RowCellIdentifiers
) => TimesheetSelectionApi = (payload: RowCellIdentifiers) => {
  const dispatch = useDispatch();

  const startDrag = useCallback(() => {
    dispatch(ActivityReportSelectionActions.startDrag(payload));
  }, []);

  const onSelecting = useCallback(
    (ctrl: boolean) => {
      dispatch(
        ActivityReportSelectionActions.onSelecting({ ...payload, ctrl })
      );
    },
    [payload.rowKey, payload.key]
  );

  const onMove = useCallback(() => {
    dispatch(ActivityReportSelectionActions.onMove(payload));
  }, [payload.rowKey, payload.key]);

  const onRangeMove = useCallback(() => {
    dispatch(ActivityReportSelectionActions.onRangeMove(payload));
  }, [payload.rowKey, payload.key]);

  const endDrag = useCallback(() => {
    dispatch(ActivityReportSelectionActions.endDrag(payload));
  }, []);

  const isHolidingCtrl = useCallback((ctrl: boolean) => {
    dispatch(ActivityReportSelectionActions.isHolidingCtrl(ctrl));
  }, []);

  const api: TimesheetSelectionApi = useMemo(
    () => ({
      startDrag,
      onMove,
      onRangeMove,
      onSelecting,
      endDrag,
      isHolidingCtrl,
    }),
    []
  );

  return api;
};
