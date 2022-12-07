import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const namespace = `activity-report-selection`;

export interface ActivityReportSheetSelectionState {
  dragging?: boolean;
  range: Set<string>;
}
export const initialState: ActivityReportSheetSelectionState = {
  range: new Set<string>(),
};

export const activityReportSelectionState = createSlice({
  name: `${namespace}`,
  initialState,
  reducers: {
    startDrag: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      state.dragging = true;
      state.range.add(key);
    },
    onMove: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (key) {
        const keyNotFound = !state.range.has(key);
        if (state.dragging && keyNotFound) {
          state.range.add(key);
        }
      }
    },
    endDrag: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      state.dragging = false;
      if (key) {
        state.range.add(action.payload);
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
