import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import {
  SelectionPayload,
  RowCellIdentifiers,
  RowKey,
  Range,
  RangeDirection,
} from "activity-report/timesheet/common-types";
import moment from "moment";
import { generateRangeKeys } from "utils/sheet-utils";

export const namespace = `activity-report-selection`;

export interface ActivityReportSheetSelectionState {
  //key by activityReportId
  dragging: Set<RowKey>;
  //key by getKey
  selection: Set<string>;
  range: Range;
  rangeDirection: RangeDirection;
  ctrl?: boolean;
}
export const initialState: ActivityReportSheetSelectionState = {
  selection: new Set<string>(),
  dragging: new Set<RowKey>(),
  range: [],
  rangeDirection: 'increasing'
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
        range[0] = payload.day;
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
          if(!range[1]) state.rangeDirection = moment(range[0]).isBefore(payload.day) ? 'increasing' : 'decreasing';
          range[1] = payload.day;
          // if (!range[1]) {
          //   range[1] = payload.day;
          //   state.range = range.sort((a, b) => moment(a).diff(b, "days"));

          // }
          console.log(current(state.range));
        }
      } else {
        const isDragging = dragging.size;
        if (isDragging && keyNotFound) {
          selection.add(payload.key);
        }
      }
    },
    endDrag: (state, action: PayloadAction<RowCellIdentifiers>) => {
      const payload: RowCellIdentifiers = action.payload;
      const { dragging, selection, ctrl, range } = state;

      const isRowDragging = dragging.has(payload.rowKey);

      if (isRowDragging && ctrl) {
        // selection.add(payload.key);
        range[1] = payload.day;
        // select items from range{0} to range{1}
        const rangeKeys = generateRangeKeys(
          payload.activityReportId,
          current(range)
        );

        console.log({ rangeKeys });
        for (const key of rangeKeys) {
          selection.add(key);
        }
      } else {
        selection.add(payload.key);
      }
      state.range = [];
      state.rangeDirection = 'increasing';
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
