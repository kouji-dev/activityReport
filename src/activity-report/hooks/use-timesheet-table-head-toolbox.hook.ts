import { useCallback, useMemo } from "react";
import { useDispatch } from "store";
import { Id } from "utils/types";

type TimehseetTableHeadToolboxApi = {
  unselectAll: () => void;
};

export const useTimesheetToolboxCell: () => TimehseetTableHeadToolboxApi = () => {
  const dispatch = useDispatch();

  const unselectAll = useCallback(() => {
    dispatch(ActivityReportSelectionActions);
  }, []);

  const api: TimehseetToolboxCellApi = useMemo(
    () => ({
      unselectAll
    }),
    []
  );

  return api;
};
