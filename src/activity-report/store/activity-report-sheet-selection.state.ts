import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import {
  RowCellIdentifiers,
  RowKey,
} from "activity-report/timesheet/common-types";

const namespace = `activity-report-selection`;

export interface ActivityReportSheetSelectionState {
  dragging: Set<RowKey>;
  selection: Set<string>;
}
export const initialState: ActivityReportSheetSelectionState = {
  selection: new Set<string>(),
  dragging: new Set<RowKey>(),
};

export const activityReportSelectionState = createSlice({
  name: `${namespace}`,
  initialState,
  reducers: {
    startDrag: (state, action: PayloadAction<RowCellIdentifiers>) => {
      const payload: RowCellIdentifiers = action.payload;
      state.dragging.add(payload.rowKey);
      state.selection.add(payload.key);
    },
    onMove: (state, action: PayloadAction<RowCellIdentifiers>) => {
      const payload: RowCellIdentifiers = action.payload;
      const keyNotFound = !state.selection.has(payload.key);
      if (state.dragging.size && keyNotFound) {
        state.selection.add(payload.key);
      }
    },
    onRangeMove: (state, action: PayloadAction<RowCellIdentifiers>) => {
      const payload: RowCellIdentifiers = action.payload;
      const keyNotFound = !state.selection.has(payload.key);
      console.log({ d: current(state.dragging) });
      if (state.dragging.has(payload.rowKey) && keyNotFound) {
        state.selection.add(payload.key);
      }
    },
    endDrag: (state, action: PayloadAction<RowCellIdentifiers>) => {
      const payload: RowCellIdentifiers = action.payload;
      state.dragging.delete(payload.rowKey);
      state.selection.add(payload.key);
    },
  },
});

// Action creators are generated for each case reducer function
export const ActivityReportSelectionActions = {
  ...activityReportSelectionState.actions,
};

// Reducer
export default activityReportSelectionState.reducer;
