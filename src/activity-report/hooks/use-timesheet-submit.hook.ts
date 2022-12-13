import { submitSelectionThunk } from "activity-report/store/thunks/activity-report-sheet-selection.thunks";
import { useCallback, useMemo } from "react";
import { useDispatch } from "store";

type TimehseetSubmitApi = {
  submit: () => void;
};

export const useTimesheetSubmit: () => TimehseetSubmitApi = () => {
  const dispatch = useDispatch();

  const submit = useCallback(() => {
    dispatch(submitSelectionThunk());
  }, []);

  const api: TimehseetSubmitApi = useMemo(
    () => ({
      submit,
    }),
    []
  );

  return api;
};
