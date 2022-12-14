import { submitSelectionThunk } from "activity-report/store/thunks/activity-report-sheet-selection.thunks";
import { useCallback, useMemo } from "react";
import { useDispatch } from "store";
import { Id } from "utils/types";

type TimehseetToolboxCellApi = {
  selectAll: (activityReportId: Id) => void;
  deselectAll: (activityReportId: Id) => void;
};

export const useTimesheetToolboxCell: () => TimehseetToolboxCellApi = () => {
  const dispatch = useDispatch();

  const selectAll = useCallback(() => {
    dispatch(submitSelectionThunk());
  }, []);

  const deselectAll = useCallback(() => {
    dispatch(submitSelectionThunk());
  }, []);

  const api: TimehseetToolboxCellApi = useMemo(
    () => ({
      selectAll,
      deselectAll,
    }),
    []
  );

  return api;
};
