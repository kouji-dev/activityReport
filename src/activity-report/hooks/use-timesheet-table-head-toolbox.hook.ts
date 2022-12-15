import { ActivityReportSelectionActions } from "activity-report/store/activity-report-sheet-selection.state";
import { useCallback, useMemo } from "react";
import { useDispatch } from "store";

type TimehseetTableHeadToolboxApi = {
  unselectAll: () => void;
};

export const useTimesheetTableHeadToolboxCell: () => TimehseetTableHeadToolboxApi =
  () => {
    const dispatch = useDispatch();

    const unselectAll = useCallback(() => {
      dispatch(ActivityReportSelectionActions.deselectAll());
    }, []);

    const api: TimehseetTableHeadToolboxApi = useMemo(
      () => ({
        unselectAll,
      }),
      []
    );

    return api;
  };
