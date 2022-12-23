import {
    SheetCellStatus,
    SheetData,
    SheetMode,
    getDefaultHalfDay,
    Selection,
} from "../table/common-types";
import {IActivity} from "@models/activity.model";
import {
    createSlice,
    isFulfilled,
    isPending,
    PayloadAction,
} from "@reduxjs/toolkit";
import {getFakeReports} from "../../fakeData/fake-data";
import {IReport} from "@models/report.model";
import {createAsyncThunk} from "utils/store-utils";
import {
    approveAllThunk,
    declareAllThunk,
    declareSelectionThunk, rejectAllThunk,
    submitReportsThunk,
    undeclareAllThunk,
} from "./thunks/report.thunks";
import {Id} from "utils/types";
import {toServerFormat} from "utils/date-utils";
import moment from "moment";
import {
    approveActivitiesAction,
    approveAllAction,
    rejectActivitiesAction,
    rejectAllAction,
    removeActivitiesAction,
    toggleActivitiesStatusAction,
} from "./actions/report.actions";

export const namespace = `report`;

export interface ReportState
    extends SheetData<IReport, IActivity> {
    loading?: boolean;
}

export const initialState: ReportState = {
    ids: [],
    entities: {},
    columns: [],
    month: null,
    mode: SheetMode.EDITTING,
    loading: false,
};

export const reportState = createSlice({
    name: `${namespace}`,
    initialState,
    reducers: {
        startLoading: (state: ReportState) => {
            state.loading = true;
        },
        stopLoading: (state: ReportState) => {
            state.loading = false;
        },
        updateMode: (
            state: ReportState,
            action: PayloadAction<SheetMode>
        ) => {
            state.mode = action.payload;
        },
        removeActivities: removeActivitiesAction,
        approveActivities: approveActivitiesAction,
        rejectActivities: rejectActivitiesAction,
        toggleActivitiesStatus: toggleActivitiesStatusAction,
        approveAll: approveAllAction,
        rejectAll: rejectAllAction,
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchActivityReports.fulfilled,
                (
                    _: ReportState,
                    action: PayloadAction<ReportState>
                ) => {
                    return action.payload;
                }
            )
            .addCase(
                declareSelectionThunk.fulfilled,
                (state: ReportState, action: PayloadAction<Selection>) => {
                    const keys = action.payload;
                    Object.keys(keys).forEach((reportId: Id) => {
                        const activityReport = state.entities[reportId];
                        if (!activityReport.meta.submitted) {
                            activityReport.meta.submitted = true;
                        }
                        activityReport.meta.submissionDate = toServerFormat(moment());

                        for (const day of keys[reportId]) {
                            if (!activityReport.entities[day]) {
                                activityReport.ids.push(day);
                                activityReport.entities[day] = {
                                    date: day as string,
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
                (state: ReportState, action: PayloadAction<Id>) => {
                    const reportId = action.payload;
                    state.entities[reportId].ids = [];
                    state.entities[reportId].entities = {};
                    const meta = state.entities[reportId].meta;
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
        return new Promise<ReportState>((resolve) => {
            setTimeout(() => {
                resolve(getFakeReports(projectIds));
            }, Math.random() * 2500);
        });
    }
);

// Action creators are generated for each case reducer function
export const ReportActions = {
    ...reportState.actions,
    fetchActivityReports,
    undeclareAllThunk,
    declareAllThunk,
    approveAllThunk,
    rejectAllThunk
};

// Reducer
export default reportState.reducer;
