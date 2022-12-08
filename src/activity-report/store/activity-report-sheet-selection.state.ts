import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import {
  SelectionPayload,
  RowCellIdentifiers,
  RowKey,
  Range,
} from "activity-report/timesheet/common-types";
import { generateRangeKeys } from "utils/sheet-utils";

const namespace = `activity-report-selection`;

export interface ActivityReportSheetSelectionState {
  dragging: Set<RowKey>;
  selection: Set<string>;
  range: Range;
  ctrl?: boolean;
}
export const initialState: ActivityReportSheetSelectionState = {
  selection: new Set<string>(),
  dragging: new Set<RowKey>(),
  range: [],
};

export const activityReportSelectionState = createSlice({
  name: `${namespace}`,
  initialState,
  reducers: {
    startDrag: (state, action: PayloadAction<RowCellIdentifiers>) => {
      const payload: RowCellIdentifiers = action.payload;
      const { dragging, selection, ctrl, range } = state;
      dragging.add(payload.rowKey);
      selection.add(payload.key);
      if (ctrl) {
        range[0] = { date: payload.day };
      }
    },
    onSelecting: (state, action: PayloadAction<SelectionPayload>) => {
      const payload: SelectionPayload = action.payload;
      const { ctrl, dragging, selection, range } = state;

      const wasHoldingCtrl = ctrl;
      const keyNotFound = !selection.has(payload.key);
      const stillHoldingCtrl = ctrl && payload.ctrl == ctrl;

      if (!keyNotFound) return;
      if (wasHoldingCtrl && stillHoldingCtrl) {
        const isRowDragging = dragging.has(payload.rowKey);
        if (isRowDragging) {
          // selection.add(payload.key);
          range[1] = { date: payload.day };
        }
      } else {
        const isDragging = dragging.size;
        if (isDragging && keyNotFound) {
          selection.add(payload.key);
        }
      }
    },
    onMove: (state, action: PayloadAction<RowCellIdentifiers>) => {
      // const payload: RowCellIdentifiers = action.payload;
      // const keyNotFound = !state.selection.has(payload.key);
      // if (state.dragging.size && keyNotFound) {
      //   state.selection.add(payload.key);
      // }
    },
    onRangeMove: (state, action: PayloadAction<RowCellIdentifiers>) => {
      // const payload: RowCellIdentifiers = action.payload;
      // const { ctrl, dragging, selection } = state;
      // const keyNotFound = !selection.has(payload.key);
      // console.log({ d: current(dragging) });
      // if (dragging.has(payload.rowKey) && ctrl && keyNotFound) {
      //   state.selection.add(payload.key);
      // }
    },
    endDrag: (state, action: PayloadAction<RowCellIdentifiers>) => {
      const payload: RowCellIdentifiers = action.payload;
      const { dragging, selection, ctrl, range } = state;

      const isRowDragging = dragging.has(payload.rowKey);

      if (isRowDragging && ctrl) {
        // selection.add(payload.key);
        range[1] = { date: payload.day };
        // select items from range{0} to range{1}
        const rangeKeys = generateRangeKeys(
          payload.activityReportId,
          current(range)
        );
        for (const key of rangeKeys) {
          selection.add(key);
        }
      } else {
        selection.add(payload.key);
      }
      console.log(current(range), current(selection));
      state.range = [];
      dragging.clear();
    },
    isHolidingCtrl: (state, action: PayloadAction<boolean>) => {
      if (state.ctrl != action.payload) {
        state.ctrl = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const ActivityReportSelectionActions = {
  ...activityReportSelectionState.actions,
};

// Reducer
export default activityReportSelectionState.reducer;
