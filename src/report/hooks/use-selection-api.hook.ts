import { RowCellIdentifiers } from "report/table/common-types";
import { useCallback, useMemo } from "react";
import { useDispatch } from "store";
import {ReportSelectionActions} from "@store/report-selection.state";

export type SelectionApi = {
  startDrag: () => void;
  onSelecting: (ctrl: boolean) => void;
  endDrag: () => void;
  isHoldingCtrl: (ctrl: boolean) => void;
};

export const useSelectionApi: (
  payload: RowCellIdentifiers
) => SelectionApi = (payload: RowCellIdentifiers) => {
  const dispatch = useDispatch();

  const startDrag = useCallback(() => {
    dispatch(ReportSelectionActions.startDragThunk(payload));
  }, []);

  const onSelecting = useCallback(
    (ctrl: boolean) => {
      dispatch(
          ReportSelectionActions.onSelectingThunk({
          ...payload,
          ctrl,
        })
      );
    },
    [payload.rowKey, payload.reportId, payload.day]
  );

  const endDrag = useCallback(() => {
    dispatch(ReportSelectionActions.endDragThunk(payload));
  }, []);

  const isHoldingCtrl = useCallback((ctrl: boolean) => {
    dispatch(ReportSelectionActions.isHoldingCtrl(ctrl));
  }, []);

  const api: SelectionApi = useMemo(
    () => ({
      startDrag,
      onSelecting,
      endDrag,
      isHoldingCtrl,
    }),
    []
  );

  return api;
};
