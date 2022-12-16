import { createSlice } from "@reduxjs/toolkit";
import {
  RowKey,
  Range,
  RangeDirection,
  Selection,
} from "activity-report/timesheet/common-types";
import {
  deselectAllAction,
  endDragAction,
  isHoldingCtrlAction,
  onSelectingAction,
  startDragAction,
} from "./actions/activity-report-sheet-selection.actions";

export const namespace = `activity-report-selection`;

export interface ActivityReportSheetSelectionState {
  dragging: Set<RowKey>;
  selection: Selection;
  range: Range;
  rangeDirection: RangeDirection;
  ctrl?: boolean;
}
export const initialState: ActivityReportSheetSelectionState = {
  selection: {},
  dragging: new Set<RowKey>(),
  range: [],
  rangeDirection: "increasing",
};

export const activityReportSelectionState = createSlice({
  name: `${namespace}`,
  initialState,
  reducers: {
    startDrag: startDragAction,
    onSelecting: onSelectingAction,
    endDrag: endDragAction,
    isHolidingCtrl: isHoldingCtrlAction,
    deselectAll: deselectAllAction,
  },
});

// Action creators are generated for each case reducer function
export const ActivityReportSelectionActions = {
  ...activityReportSelectionState.actions,
};

// Reducer
export default activityReportSelectionState.reducer;
