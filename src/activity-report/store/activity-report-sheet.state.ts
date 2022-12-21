import {
  SheetCellStatus,
  SheetData,
  SheetMode,
  getDefaultHalfDay,
  Selection,
} from ".././timesheet/common-types";
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
import {
  declareAllThunk,
  declareSelectionThunk,
  submitReportsThunk,
  undeclareAllThunk,
} from "./thunks/activity-report-sheet.thunks";
import { Id } from "utils/types";
import { toServerFormat } from "utils/date-utils";
import moment from "moment";
import { approveActivitiesAction, rejectActivitiesAction, removeActivitiesAction } from "./actions/activity-report-sheet.actions";

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
    updateMode: (
      state: ActivityReportSheetState,
      action: PayloadAction<SheetMode>
    ) => {
      state.mode = action.payload;
    },
    removeActivities: removeActivitiesAction,
    approveActivities: approveActivitiesAction,
    rejectActivities: rejectActivitiesAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchActivityReports.fulfilled,
        (
          _: ActivityReportSheetState,
          action: PayloadAction<ActivityReportSheetState>
        ) => {
          return action.payload;
        }
      )
      .addCase(
        declareSelectionThunk.fulfilled,
        (state: ActivityReportSheetState, action: PayloadAction<Selection>) => {
          const keys = action.payload;
          Object.keys(keys).forEach((activityReportId) => {
            const activityReport = state.entities[activityReportId];
            if (!activityReport.meta.submitted) {
              activityReport.meta.submitted = true;
            }
            activityReport.meta.submissionDate = toServerFormat(moment());

            for (const day of keys[activityReportId]) {
              if (!activityReport.entities[day]) {
                activityReport.ids.push(day);
                activityReport.entities[day] = {
                  date: day,
                  status: SheetCellStatus.PENDING,
                  morning: getDefaultHalfDay(true),
                  afternoon: getDefaultHalfDay(true),
                };
              }
            }
          });
        }
      )
      .addCase(
        undeclareAllThunk.fulfilled,
        (state: ActivityReportSheetState, action: PayloadAction<Id>) => {
          const activityReportId = action.payload;
          state.entities[activityReportId].ids = [];
          state.entities[activityReportId].entities = {};
          const meta = state.entities[activityReportId].meta;
          meta.submitted = undefined;
          meta.submissionDate = undefined;
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
  undeclareAllThunk,
  declareAllThunk,
};

// Reducer
export default activityReportState.reducer;
