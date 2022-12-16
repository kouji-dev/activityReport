import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import {
  SelectionPayload,
  RowCellIdentifiers,
  RowKey,
  Range,
  RangeDirection,
  Selection,
} from "activity-report/timesheet/common-types";
import moment from "moment";
import { generateRangeKeys } from "utils/sheet-utils";
import { Id } from "utils/types";

export const namespace = `activity-report-selection`;

export interface ActivityReportSheetSelectionState {
  //key by activityReportId
  dragging: Set<RowKey>;
  //key by getKey
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
    startDrag: (state, action: PayloadAction<RowCellIdentifiers>) => {
      const payload: RowCellIdentifiers = action.payload;
      const { dragging, selection, ctrl, range } = state;
      dragging.add(payload.rowKey);
      if (!selection[payload.activityReportId])
        selection[payload.activityReportId] = new Set<string>();
      selection[payload.activityReportId].add(payload.day);
      if (ctrl) {
        range[0] = payload.day;
      }
    },
    onSelecting: (state, action: PayloadAction<SelectionPayload>) => {
      const payload = action.payload;
      const { activityReportId, day }: SelectionPayload = action.payload;
      const { ctrl, dragging, selection, range } = state;

      const wasHoldingCtrl = ctrl;
      const keyNotFound = !(
        selection[activityReportId] && selection[activityReportId].has(day)
      );
      const stillHoldingCtrl = ctrl && payload.ctrl == ctrl;

      if (!keyNotFound) return;
      if (wasHoldingCtrl && stillHoldingCtrl) {
        const isRowDragging = dragging.has(payload.rowKey);
        if (isRowDragging) {
          if (!range[1])
            state.rangeDirection = moment(range[0]).isBefore(payload.day)
              ? "increasing"
              : "decreasing";
          range[1] = payload.day;
        }
      } else {
        const isDragging = dragging.size;
        if (isDragging && keyNotFound) {
          if (!selection[activityReportId]) {
            selection[activityReportId] = new Set<string>();
          }
          selection[activityReportId].add(day);
        }
      }
    },
    endDrag: (state, action: PayloadAction<RowCellIdentifiers>) => {
      const payload: RowCellIdentifiers = action.payload;
      const { activityReportId, day } = action.payload;
      const { dragging, selection, ctrl, range } = state;

      const isRowDragging = dragging.has(payload.rowKey);

      if (isRowDragging && ctrl) {
        // selection.add(payload.key);
        range[1] = payload.day;
        // select items from range{0} to range{1}
        const rangeKeys = generateRangeKeys(current(range));
        for (const key of rangeKeys) {
          selection[activityReportId].add(key);
        }
      } else {
        if (!selection[activityReportId]) {
          selection[activityReportId] = new Set<string>();
        }
        selection[activityReportId].add(day);
      }
      state.range = [];
      state.rangeDirection = "increasing";
      dragging.clear();
    },
    isHolidingCtrl: (state, action: PayloadAction<boolean>) => {
      if (state.ctrl != action.payload) {
        state.ctrl = action.payload;
      }
    },
    deselectAll: (state: ActivityReportSheetSelectionState) => {
      state.selection = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const ActivityReportSelectionActions = {
  ...activityReportSelectionState.actions,
  startDragThunk
};

// Reducer
export default activityReportSelectionState.reducer;
