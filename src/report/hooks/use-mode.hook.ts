import { ReportActions } from "report/store/report.state";
import { SheetMode } from "report/table/common-types";
import { useCallback, useMemo } from "react";
import { useDispatch } from "store";

type ModeApi = {
  updateMode: (sheetMode: SheetMode) => void;
};

export const useModeApi: () => ModeApi = () => {
  const dispatch = useDispatch();

  const updateMode = useCallback((sheetMode: SheetMode) => {
    dispatch(ReportActions.updateMode(sheetMode));
  }, []);

  const api: ModeApi = useMemo(
    () => ({
      updateMode,
    }),
    []
  );

  return api;
};
