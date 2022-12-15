import { ActivityReportActions } from "activity-report/store/activity-report-sheet.state";
import { useCallback, useMemo } from "react";
import { useDispatch } from "store";
import { Id } from "utils/types";

type TimehseetToolboxCellApi = {
  declareAll: (activityReportId: Id) => void;
  undeclareAll: (activityReportId: Id) => void;
};

export const useTimesheetToolboxCell: () => TimehseetToolboxCellApi = () => {
  const dispatch = useDispatch();

  const declareAll = useCallback((activityReportId: Id) => {
    dispatch(ActivityReportActions.declareAllThunk(activityReportId));
  }, []);

  const undeclareAll = useCallback((activityReportId: Id) => {
    dispatch(ActivityReportActions.undeclareAllThunk(activityReportId));
  }, []);

  const api: TimehseetToolboxCellApi = useMemo(
    () => ({
      declareAll,
      undeclareAll,
    }),
    []
  );

  return api;
};
