import {
  RowCellIdentifiers,
  SheetCellStatus,
  SheetMode,
} from "activity-report/timesheet/common-types";
import { createAsyncThunk } from "utils/store-utils";
import {
  EndDragPayload,
  startDragAction,
} from "../actions/activity-report-sheet-selection.actions";
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

type StartDragThunkReturn = void;
type StartDragThunkPayload = RowCellIdentifiers;
export const startDragThunk = createAsyncThunk<
  StartDragThunkReturn,
  StartDragThunkPayload
>(`${namespace}/startDragThunk`, async (payload, { getState, dispatch }) => {
  const { activityReportId, day } = payload;
  const cell =
    getState().activityReport.entities[activityReportId]?.entities[day];
  const isEdittable = getState().activityReport.mode === SheetMode.EDITTING;

  if (cell || isEdittable) {
    dispatch(ActivityReportSelectionActions.startDrag(payload));
  }
});

type EndDragThunkReturn = void;
type EndDragThunkPayload = RowCellIdentifiers;
export const endDragThunk = createAsyncThunk<
  EndDragThunkReturn,
  EndDragThunkPayload
>(`${namespace}/endDragThunk`, async (payload, { getState, dispatch }) => {
  const { activityReportId } = payload;
  const currentState = getState().activityReport;
  const endDragPayload: EndDragPayload = {
    ...payload,
    existingCells: currentState.entities[activityReportId].ids,
    mode: currentState.mode,
  };
  dispatch(ActivityReportSelectionActions.endDrag(endDragPayload));
});
