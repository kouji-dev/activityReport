import {
  RowCellIdentifiers,
  Selection,
  SheetCellStatus,
  SheetMode,
} from "activity-report/timesheet/common-types";
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
import {
  declareSelectionThunk,
  removeActivitiesThunk,
  submitReportsThunk,
} from "./activity-report-sheet.thunks";

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
  const mode = currentState.mode;
  const endDragPayload: EndDragPayload = {
    ...payload,
    existingCells: currentState.entities[activityReportId].ids,
    mode,
  };
  dispatch(ActivityReportSelectionActions.endDrag(endDragPayload));
  const selection = Array.from(
    getState().activityReportSelection.selection[activityReportId]
  );
  const toUnselect: Selection = { [activityReportId]: [] };
  const toSelect: Selection = { [activityReportId]: [] };

  const currentActivitiesEntities =
    getState().activityReport.entities[activityReportId].entities;

  for (const day of selection) {
    const canSelect =
      mode === SheetMode.EDITTING
        ? !currentActivitiesEntities[day]
        : mode === SheetMode.VALIDATING &&
          (currentActivitiesEntities[day].status === SheetCellStatus.PENDING ||
            currentActivitiesEntities[day].status === SheetCellStatus.REJECTED);
    if (!canSelect) {
      toUnselect[activityReportId].push(day);
    } else {
      toSelect[activityReportId].push(day);
    }
  }
  if (mode === SheetMode.EDITTING) {
    await dispatch(removeActivitiesThunk(toUnselect));
    await dispatch(declareSelectionThunk(toSelect));
  } else if (mode === SheetMode.VALIDATING) {
    await dispatch(approveActivitiesThunk(toUnselect));
    await dispatch(rejectActivitiesThunk(toSelect));
  }
  dispatch(ActivityReportSelectionActions.deselectAll());
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
