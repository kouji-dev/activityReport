import { SheetData, SheetMode } from ".././timesheet/common-types";
import { IStandardActivity } from "../../models/standard-activity.model";
import {
  createSlice,
  isFulfilled,
  isPending,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getFakeActivityReports } from "../../fakeData/fake-data";
import { IActivityReport } from "../../models/activity-report.model";
import { createAsyncThunk } from "utils/store-utils";
import { submitReportsThunk } from "./thunks/activity-report-sheet.thunks";

export const namespace = `activity-report`;

export interface ActivityReportSheetState
  extends SheetData<IActivityReport, IStandardActivity> {
  loading?: boolean;
}
export const initialState: ActivityReportSheetState = {
  ids: [],
  entities: {},
  columns: [],
  month: null,
  mode: SheetMode.EDITTING,
  loading: false,
};

export const activityReportState = createSlice({
  name: `${namespace}`,
  initialState,
  reducers: {
    startLoading: (state: ActivityReportSheetState) => {
      state.loading = true;
    },
    stopLoading: (state: ActivityReportSheetState) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchActivityReports.fulfilled,
        (
          state: ActivityReportSheetState,
          action: PayloadAction<ActivityReportSheetState>
        ) => {
          return action.payload;
        }
      )
      .addMatcher(
        isPending(submitReportsThunk, fetchActivityReports),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isFulfilled(submitReportsThunk, fetchActivityReports),
        (state) => {
          state.loading = false;
        }
      );
  },
});

const fetchActivityReports = createAsyncThunk(
  `${namespace}/fetchData`,
  async (projectIds: number[]) => {
    return new Promise<ActivityReportSheetState>((resolve) => {
      setTimeout(() => {
        resolve(getFakeActivityReports(projectIds));
      }, Math.random() * 2500);
    });
  }
);

// Action creators are generated for each case reducer function
export const ActivityReportActions = {
  ...activityReportState.actions,
  fetchActivityReports,
};

// Reducer
export default activityReportState.reducer;
