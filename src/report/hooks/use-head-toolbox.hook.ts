import { useCallback, useMemo } from "react";
import { useDispatch } from "store";
import {ReportSelectionActions} from "@store/report-selection.state";

type HeadToolboxApi = {
  unselectAll: () => void;
};

export const useHeadToolboxApi: () => HeadToolboxApi =
  () => {
    const dispatch = useDispatch();

    const unselectAll = useCallback(() => {
      dispatch(ReportSelectionActions.deselectAll());
    }, []);

    const api: HeadToolboxApi = useMemo(
      () => ({
        unselectAll,
      }),
      []
    );

    return api;
  };
