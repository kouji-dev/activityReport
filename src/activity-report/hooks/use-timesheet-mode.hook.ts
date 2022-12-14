import { ActivityReportActions } from "activity-report/store/activity-report-sheet.state";
import { SheetMode } from "activity-report/timesheet/common-types";
import { useCallback, useMemo } from "react";
import { useDispatch } from "store";

type TimehseetModeApi = {
  updateMode: (sheetMode: SheetMode) => void;
};

export const useTimesheetMode: () => TimehseetModeApi = () => {
  const dispatch = useDispatch();

  const updateMode = useCallback((sheetMode: SheetMode) => {
    dispatch(ActivityReportActions.updateMode(sheetMode));
  }, []);

  const api: TimehseetModeApi = useMemo(
    () => ({
      updateMode,
    }),
    []
  );

  return api;
};
