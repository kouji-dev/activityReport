import { Selection } from "activity-report/timesheet/common-types";
import { fromServerFormat, getSheetColumns } from "utils/date-utils";
import { createAsyncThunk } from "utils/store-utils";
import { Id } from "utils/types";
import {
  ApproveActivitiesPayload,
  RejectActivitiesPayload,
  RemoveActivitiesPayload,
} from "../actions/activity-report-sheet.actions";
import { ActivityReportSelectionActions } from "../activity-report-sheet-selection.state";
import { ActivityReportActions } from "../activity-report-sheet.state";

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
        (keys[activityReportId] as Set<string>).add(col.day);
      }
      resolve(keys);
    });
    await dispatch(declareSelectionThunk(keys));
    dispatch(ActivityReportSelectionActions.deselectAll());
  }
);

type DeclareSelectionThunkReturn = Promise<Selection>;
type DeclareSelectionThunkPayload = Selection;
export const declareSelectionThunk = createAsyncThunk<
  DeclareSelectionThunkReturn,
  DeclareSelectionThunkPayload
>(`${namespace}/declareSelectionThunk`, async (keys: Selection) => {
  return Promise.resolve(keys);
});

export const undeclareAllThunk = createAsyncThunk(
  `${namespace}/undeclareAll`,
  async (activityReportId: Id, { dispatch }) => {
    dispatch(ActivityReportSelectionActions.deselectAll());
    return activityReportId;
  }
);

type RemoveActivitiesThunkReturn = void;
type RemoveActivitiesThunkPayload = Selection;
export const removeActivitiesThunk = createAsyncThunk<
  RemoveActivitiesThunkReturn,
  RemoveActivitiesThunkPayload
>(`${namespace}/removeActivitiesThunk`, async (payload, { dispatch }) => {
  const removeActivitiesPayload: RemoveActivitiesPayload = {
    ...payload,
  };
  dispatch(ActivityReportActions.removeActivities(removeActivitiesPayload));
});

type ApproveActivitiesThunkReturn = void;
type ApproveActivitiesThunkPayload = Selection;
export const approveActivitiesThunk = createAsyncThunk<
  ApproveActivitiesThunkReturn,
  ApproveActivitiesThunkPayload
>(`${namespace}/approveActivitiesThunk`, async (payload, { dispatch }) => {
  const approveActivitiesPayload: ApproveActivitiesPayload = payload;
  console.log({ payload });
  dispatch(ActivityReportActions.approveActivities(approveActivitiesPayload));
});

type RejectActivitiesThunkReturn = void;
type RejectActivitiesThunkPayload = Selection;
export const rejectActivitiesThunk = createAsyncThunk<
  RejectActivitiesThunkReturn,
  RejectActivitiesThunkPayload
>(`${namespace}/rejectActivitiesThunk`, async (payload, { dispatch }) => {
  const rejectActivitiesPayload: RejectActivitiesPayload = payload;
  dispatch(ActivityReportActions.rejectActivities(rejectActivitiesPayload));
});

type ToggleActivitisStatusThunkReturn = void;
type ToggleActivitisStatusThunkPayload = Selection;
export const toggleActivitisStatusThunk = createAsyncThunk<
  ToggleActivitisStatusThunkReturn,
  ToggleActivitisStatusThunkPayload
>(`${namespace}/toggleActivitisStatusThunk`, async (payload, { dispatch }) => {
  const toggleActivitisStatusPayload: ToggleActivitisStatusPayload = payload;
  dispatch(ActivityReportActions.toggleActivitisStatus(toggleActivitisStatusPayload));
});
