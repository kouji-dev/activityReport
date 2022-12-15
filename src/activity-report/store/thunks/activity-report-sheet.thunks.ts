import { Selection } from "activity-report/timesheet/common-types";
import { fromServerFormat, getSheetColumns } from "utils/date-utils";
import { createAsyncThunk } from "utils/store-utils";
import { Id } from "utils/types";
import { ActivityReportSelectionActions } from "../activity-report-sheet-selection.state";

const namespace = "activity-report";

export const submitReportsThunk = createAsyncThunk(
  `${namespace}/submit`,
  async (selection: Selection, { dispatch }) => {
    const keys = await new Promise<any>((resolve) => {
      const mapped: Record<string, string[]> = {};
      for (const activityReportId of Object.keys(selection)) {
        for (const day of selection[activityReportId].values()) {
          if (!mapped[activityReportId]) mapped[activityReportId] = [];
          mapped[activityReportId].push(day);
        }
      }
      resolve(mapped);
    });
    await dispatch(declareSelectionThunk(keys));
    dispatch(ActivityReportSelectionActions.deselectAll());
  }
);

export const declareAllThunk = createAsyncThunk(
  `${namespace}/declareAll`,
  async (activityReportId: Id, { getState, dispatch }) => {
    const keys = await new Promise<any>((resolve) => {
      const date = getState().activityReport.month;
      const holidays = getState().holidays;
      const columns = getSheetColumns(fromServerFormat(date), holidays);
      const keys: Selection = {
        [activityReportId]: new Set<string>(),
      };
      for (const col of columns) {
        keys[activityReportId].add(col.day);
      }
      resolve(keys);
    });
    await dispatch(declareSelectionThunk(keys));
    dispatch(ActivityReportSelectionActions.deselectAll());
  }
);

export const declareSelectionThunk = createAsyncThunk(
  `${namespace}/declareSelection`,
  async (keys: Selection) => {
    return Promise.resolve(keys);
  }
);

export const undeclareAllThunk = createAsyncThunk(
  `${namespace}/undeclareAll`,
  async (activityReportId: Id, { dispatch }) => {
    dispatch(ActivityReportSelectionActions.deselectAll());
    return activityReportId;
  }
);
