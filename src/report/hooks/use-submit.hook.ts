import { useCallback, useMemo } from "react";
import { useDispatch } from "store";
import {ReportSelectionActions} from "@store/report-selection.state";

type SubmitApi = {
  submit: () => void;
};

export const useSubmitApi: () => SubmitApi = () => {
  const dispatch = useDispatch();

  const submit = useCallback(() => {
    dispatch(ReportSelectionActions.submitSelectionThunk());
  }, []);

  const api: SubmitApi = useMemo(
    () => ({
      submit,
    }),
    []
  );

  return api;
};
