import { SheetData, SheetMode } from './timesheet/common-types';
import { IStandardActivity } from '../models/standard-activity.model';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFakeActivityReports } from '../fakeData/fake-data';
import { IActivityReport } from '../models/activity-report.model';

const namespace = `activity-report`;

export interface ActivityReportSheetState
  extends SheetData<IActivityReport, IStandardActivity> {}
export const initialState: ActivityReportSheetState = {
  ids: [],
  entities: {},
  columns: [],
  month: null,
  mode: SheetMode.EDITTING,
};

export const activityReportState = createSlice({
  name: `${namespace}`,
  initialState,
  reducers: {
    approveReport: (state) => {},
    selectRangeOfDays: (state, payload) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchActivityReports.fulfilled,
      (
        state: ActivityReportSheetState,
        action: PayloadAction<ActivityReportSheetState>
      ) => {
        return action.payload;
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
