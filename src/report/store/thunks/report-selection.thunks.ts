import {
  RowCellIdentifiers,
  Selection,
  SheetCellStatus,
  SheetMode,
} from "report/table/common-types";
import { createAsyncThunk } from "utils/store-utils";
import {
  EndDragPayload,
  OnSelectionPayload,
  StartDragPayload,
} from "../actions/report-selection.actions";
import {
  ReportSelectionActions,
} from "../report-selection.state";
import {
  declareSelectionThunk,
  removeActivitiesThunk,
  submitReportsThunk,
  toggleActivitiesStatusThunk,
} from "./report.thunks";
import {Id} from "@utils/types";

const namespace = 'report-selection';

export const submitSelectionThunk = createAsyncThunk(
  `${namespace}/submit`,
  async (_, { getState, dispatch }) => {
    const selection = getState().reportSelection.selection;
    await dispatch(submitReportsThunk(selection));
    dispatch(ReportSelectionActions.deselectAll());
  }
);

type StartDragThunkReturn = void;
type StartDragThunkPayload = RowCellIdentifiers;
export const startDragThunk = createAsyncThunk<
  StartDragThunkReturn,
  StartDragThunkPayload
>(`${namespace}/startDragThunk`, async (payload, { getState, dispatch }) => {
  const currentState = getState().report;

  const startDragPayload: StartDragPayload = {
    ...payload,
    mode: currentState.mode,
  };

  dispatch(ReportSelectionActions.startDrag(startDragPayload));
});

type EndDragThunkReturn = void;
type EndDragThunkPayload = RowCellIdentifiers;
export const endDragThunk = createAsyncThunk<
  EndDragThunkReturn,
  EndDragThunkPayload
>(`${namespace}/endDragThunk`, async (payload, { getState, dispatch }) => {
  const { reportId } = payload;
  const currentState = getState().report;
  const mode = currentState.mode;
  const endDragPayload: EndDragPayload = {
    ...payload,
    existingCells: currentState.entities[reportId].ids,
    mode,
  };
  dispatch(ReportSelectionActions.endDrag(endDragPayload));

  const selection = getState().reportSelection.selection;

  if (mode === SheetMode.EDITTING) {
    const toUnselect: Selection = {};
    const toSelect: Selection = {};

    for (const key in selection) {
      const entities = getState().report.entities[key].entities;
      for (const day of selection[key]) {
        const canSelect =
          mode === SheetMode.EDITTING
            ? !entities[day]
            : mode === SheetMode.VALIDATING &&
              (entities[day].status === SheetCellStatus.PENDING ||
                entities[day].status === SheetCellStatus.REJECTED);
        if (!canSelect) {
          if (!toUnselect[key]) toUnselect[key] = [];
          (toUnselect[key] as Array<Id>).push(day);
        } else {
          if (!toSelect[key]) toSelect[key] = [];
          (toSelect[key] as Array<Id>).push(day);
        }
      }
    }
    await dispatch(removeActivitiesThunk(toUnselect));
    await dispatch(declareSelectionThunk(toSelect));
  } else if (mode === SheetMode.VALIDATING) {
    await dispatch(toggleActivitiesStatusThunk(selection));
  }
  dispatch(ReportSelectionActions.deselectAll());
});

type OnSelectingThunkReturn = void;
type OnSelectingThunkPayload = { ctrl?: boolean } & RowCellIdentifiers;
export const onSelectingThunk = createAsyncThunk<
  OnSelectingThunkReturn,
  OnSelectingThunkPayload
>(`${namespace}/onSelectingThunk`, async (payload, { getState, dispatch }) => {
  const { reportId, day } = payload;
  const currentState = getState().report;
  const onSelectingPayload: OnSelectionPayload = {
    ...payload,
    cellExists: currentState.entities[reportId].ids.includes(day),
    mode: currentState.mode,
  };
  dispatch(ReportSelectionActions.onSelecting(onSelectingPayload));
});
