import { ReportActions } from "report/store/report.state";
import { useCallback, useMemo } from "react";
import { useDispatch } from "store";
import { Id, Void } from "utils/types";

type CellToolboxApi = {
  declareAll: Void;
  undeclareAll: Void;
  rejectAll: Void;
  approveAll: Void;
};

export const useCellToolboxApi: (
  reportId: Id
) => CellToolboxApi = (reportId: Id) => {
  const dispatch = useDispatch();

  const declareAll = useCallback(() => {
    dispatch(ReportActions.declareAllThunk(reportId));
  }, []);

  const undeclareAll = useCallback(() => {
    dispatch(ReportActions.undeclareAllThunk(reportId));
  }, []);

  const approveAll = useCallback(() => {
    dispatch(ReportActions.approveAllThunk(reportId));
  }, []);

  const rejectAll = useCallback(() => {
    dispatch(ReportActions.rejectAllThunk(reportId));
  }, []);

  const api: CellToolboxApi = useMemo(
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
