import { createSelector } from "@reduxjs/toolkit";
import { getKey } from "utils/sheet-utils";
import { Id } from "utils/types";
import { IRootState } from "../../../store";
import { ActivityReportSheetSelectionState } from "../activity-report-sheet-selection.state";

const selectRoot = (state: IRootState) => state.activityReportSelection;

const rangeSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetSelectionState) => state.range
);

export const isCellSelectedSelector =
  (activityReportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      rangeSelector,
      (_, activityReportId: Id, day: string) => getKey(activityReportId, day),
      (range: string[], key: string) => range.includes(key)
    )(state, activityReportId, day);

export const isDraggingSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetSelectionState) => state.dragging
);
