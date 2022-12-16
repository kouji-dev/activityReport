import { RowCellIdentifiers } from "activity-report/timesheet/common-types";
import { createAsyncThunk } from "utils/store-utils";
import {
  ActivityReportSelectionActions,
  namespace,
} from "../activity-report-sheet-selection.state";
import { submitReportsThunk } from "./activity-report-sheet.thunks";

export const submitSelectionThunk = createAsyncThunk(
  `${namespace}/submit`,
  async (_, { getState, dispatch }) => {
    const selection = getState().activityReportSelection.selection;
    await dispatch(submitReportsThunk(selection));
    dispatch(ActivityReportSelectionActions.deselectAll());
  }
);

export const startDragThunk = createAsyncThunk(
  `${namespace}/startDragThunk`,
  async (payload: RowCellIdentifiers, { getState, dispatch }) => {
    const selection = getState().activityReportSelection.selection;
    await dispatch(submitReportsThunk(selection));
    dispatch(ActivityReportSelectionActions.deselectAll());
  }
);
