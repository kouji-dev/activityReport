import { RowCellIdentifiers } from "activity-report/timesheet/common-types";
import { createAsyncThunk } from "utils/store-utils";
import {
  EndDragPayload,
  OnSelectionPayload,
  StartDragPayload,
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
  const currentState = getState().activityReport;

  const startDragPayload: StartDragPayload = {
    ...payload,
    mode: currentState.mode,
  };

  dispatch(ActivityReportSelectionActions.startDrag(startDragPayload));
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

type OnSelectingThunkReturn = void;
type OnSelectingThunkPayload = { ctrl?: boolean } & RowCellIdentifiers;
export const onSelectingThunk = createAsyncThunk<
  OnSelectingThunkReturn,
  OnSelectingThunkPayload
>(`${namespace}/onSelectingThunk`, async (payload, { getState, dispatch }) => {
  const { activityReportId, day } = payload;
  const currentState = getState().activityReport;
  const onSelectingPayload: OnSelectionPayload = {
    ...payload,
    cellExists: currentState.entities[activityReportId].ids.includes(day),
    mode: currentState.mode,
  };
  dispatch(ActivityReportSelectionActions.onSelecting(onSelectingPayload));
});
