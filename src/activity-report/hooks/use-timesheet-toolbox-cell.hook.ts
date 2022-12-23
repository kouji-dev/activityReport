import { ActivityReportActions } from "activity-report/store/activity-report-sheet.state";
import {
  approveAllThunk,
  rejectAllThunk,
} from "activity-report/store/thunks/activity-report-sheet.thunks";
import { useCallback, useMemo } from "react";
import { useDispatch } from "store";
import { Id, Void } from "utils/types";

type TimehseetToolboxCellApi = {
  declareAll: Void;
  undeclareAll: Void;
  rejectAll: Void;
  approveAll: Void;
};

export const useTimesheetToolboxCell: (
  activityReportId: Id
) => TimehseetToolboxCellApi = (activityReportId: Id) => {
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
      approveAll,
      rejectAll,
    }),
    []
  );

  return api;
};
