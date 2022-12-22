import { ActivityReportActions } from "activity-report/store/activity-report-sheet.state";
import { useCallback, useMemo } from "react";
import { useDispatch } from "store";
import { Id } from "utils/types";

type TimehseetToolboxCellApi = {
  declareAll: (activityReportId: Id) => void;
  undeclareAll: (activityReportId: Id) => void;
};

export const useTimesheetToolboxCell: (activityReportId: Id) => TimehseetToolboxCellApi = (activityReportId: Id) => {
  const dispatch = useDispatch();

  const declareAll = useCallback(() => {
    dispatch(ActivityReportActions.declareAllThunk(activityReportId));
  }, []);

  const undeclareAll = useCallback(() => {
    dispatch(ActivityReportActions.undeclareAllThunk(activityReportId));
  }, []);
  
  const approveAll = useCallback(() => {
    dispatch(approveAllThunk(activityReportId));
  }, []);

  const rejectAll = useCallback(() => {
    dispatch(rejectAllThunk(activityReportId));
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
