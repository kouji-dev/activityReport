import { createSlice } from "@reduxjs/toolkit";
import {
  RowKey,
  Range,
  RangeDirection,
  Selection,
} from "report/table/common-types";
import {
  deselectAllAction,
  endDragAction,
  isHoldingCtrlAction,
  onSelectingAction,
  startDragAction,
} from "./actions/report-selection.actions";
import {
  endDragThunk,
  onSelectingThunk,
  startDragThunk,
  submitSelectionThunk
} from "@store/thunks/report-selection.thunks";

export const namespace = `report-selection`;

export interface ReportSelectionState {
  dragging: Set<RowKey>;
  selection: Selection;
  range: Range;
  rangeDirection: RangeDirection;
  ctrl?: boolean;
}
export const initialState: ReportSelectionState = {
  selection: {},
  dragging: new Set<RowKey>(),
  range: [],
  rangeDirection: "increasing",
};

export const reportSelectionState = createSlice({
  name: `${namespace}`,
  initialState,
  reducers: {
    startDrag: startDragAction,
    onSelecting: onSelectingAction,
    endDrag: endDragAction,
    isHoldingCtrl: isHoldingCtrlAction,
    deselectAll: deselectAllAction,
  },
});

// Action creators are generated for each case reducer function
export const ReportSelectionActions = {
  ...reportSelectionState.actions,
  submitSelectionThunk,
  startDragThunk,
  endDragThunk,
  onSelectingThunk
};

// Reducer
export default reportSelectionState.reducer;
