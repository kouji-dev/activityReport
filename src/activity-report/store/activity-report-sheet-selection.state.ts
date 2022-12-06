import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const namespace = `activity-report-selection`;

export interface ActivityReportSheetSelectionState {
  dragging?: boolean;
  range: Array<string>;
}
export const initialState: ActivityReportSheetSelectionState = {
  range: [],
};

export const activityReportSelectionState = createSlice({
  name: `${namespace}`,
  initialState,
  reducers: {
    startDrag: (state, action: PayloadAction<string>) => {
      state.dragging = true;
      state.range.push(action.payload);
    },
    onMove: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (key) {
        const keyNotFound = !state.range.includes(key);
        if (state.dragging && keyNotFound) {
          state.range.push(key);
        }
      }
    },
    endDrag: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      state.dragging = false;
      if (key) {
        state.range.push(action.payload);
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
