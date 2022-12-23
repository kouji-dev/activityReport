import { CaseReducer, current, PayloadAction } from "@reduxjs/toolkit";
import {
  RowCellIdentifiers,
  SheetMode,
} from "report/table/common-types";
import moment from "moment";
import { generateRangeKeys } from "utils/sheet-utils";
import { Id } from "utils/types";
import { ReportSelectionState } from "../report-selection.state";

export type StartDragPayload = RowCellIdentifiers & { mode: SheetMode };
type StartDragAction = CaseReducer<
  ReportSelectionState,
  PayloadAction<StartDragPayload>
>;
export const startDragAction: StartDragAction = (state, action) => {
  const { rowKey, mode, day, reportId } = action.payload;
  const { dragging, selection, ctrl, range } = state;
  dragging.add(rowKey);
  if (!selection[reportId]) {
    selection[reportId] = new Set<string>();
  }
  if (mode === SheetMode.EDITTING) {
    selection[reportId].add(day);
  }
  if (ctrl) {
    range[0] = day;
  }
};

export type OnSelectionPayload = {
  ctrl?: boolean;
  mode: SheetMode;
  cellExists: boolean;
} & RowCellIdentifiers;
type OnSelectionAction = CaseReducer<
  ReportSelectionState,
  PayloadAction<OnSelectionPayload>
>;
export const onSelectingAction: OnSelectionAction = (state, action) => {
  const payload = action.payload;
  const { reportId, day, mode, cellExists } = action.payload;
  const { ctrl, dragging, selection, range } = state;

  const keyFound =
    selection[reportId] && selection[reportId].has(day);
  if (keyFound) return;

  const wasHoldingCtrl = ctrl;
  const stillHoldingCtrl = ctrl && payload.ctrl == ctrl;

  if (wasHoldingCtrl && stillHoldingCtrl) {
    const isRowDragging = dragging.has(payload.rowKey);
    if (isRowDragging) {
      state.rangeDirection = moment(range[0]).isBefore(payload.day)
        ? "increasing"
        : "decreasing";
      range[1] = payload.day;
    }
  } else {
    const isDragging = dragging.size;
    if (isDragging && !keyFound) {
      if (!selection[reportId]) {
        selection[reportId] = new Set<string>();
      }
      if (
        mode === SheetMode.EDITTING ||
        (mode == SheetMode.VALIDATING && cellExists)
      ) {
        selection[reportId].add(day);
      }
    }
  }
};

export type EndDragPayload = RowCellIdentifiers & {
  existingCells: Id[];
  mode: SheetMode;
};
type EndDragAction = CaseReducer<
  ReportSelectionState,
  PayloadAction<EndDragPayload>
>;
export const endDragAction: EndDragAction = (state, action) => {
  const payload = action.payload;
  const { reportId, day, existingCells, mode } = action.payload;
  const { dragging, selection, ctrl, range } = state;

  const isRowDragging = dragging.has(payload.rowKey);

  if (isRowDragging && ctrl) {
    // selection.add(payload.key);
    range[1] = payload.day;
    // select items from range{0} to range{1}
    const rangeKeys = generateRangeKeys(
      current(range),
      existingCells,
      mode === SheetMode.VALIDATING
    );
    for (const key of rangeKeys) {
      selection[reportId].add(key);
    }
  } else {
    if (!selection[reportId]) {
      selection[reportId] = new Set<string>();
    }
    if (
      mode === SheetMode.EDITTING ||
      (mode === SheetMode.VALIDATING && existingCells.includes(day))
    ) {
      selection[reportId].add(day);
    }
  }
  state.range = [];
  state.rangeDirection = "increasing";
  dragging.clear();
};

export type IsHoldingCtrlPayload = boolean;
type IsHoldingCtrlAction = CaseReducer<
  ReportSelectionState,
  PayloadAction<IsHoldingCtrlPayload>
>;
export const isHoldingCtrlAction: IsHoldingCtrlAction = (state, action) => {
  if (state.ctrl != action.payload) {
    state.ctrl = action.payload;
  }
};

export type DeselectAllPayload = void;
type DeselectAllAction = CaseReducer<
  ReportSelectionState,
  PayloadAction<DeselectAllPayload>
>;
export const deselectAllAction: DeselectAllAction = (state) => {
  state.selection = {};
};
