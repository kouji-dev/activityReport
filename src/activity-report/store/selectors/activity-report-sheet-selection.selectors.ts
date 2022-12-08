import { createSelector } from "@reduxjs/toolkit";
import { getKey } from "utils/sheet-utils";
import { Id } from "utils/types";
import { IRootState } from "../../../store";
import { ActivityReportSheetSelectionState } from "../activity-report-sheet-selection.state";

const selectRoot = (state: IRootState) => state.activityReportSelection;

const selectionSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetSelectionState) => state.selection
);

export const isCellSelectedSelector =
  (activityReportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [
        selectionSelector,
        (_, activityReportId: Id, day: string) => getKey(activityReportId, day),
      ],
      (selection: Set<string>, key: string) => selection.has(key)
    )(state, activityReportId, day);

const draggingSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetSelectionState) => state.selection
);

export const isDraggingSelector =
  (activityReportId: Id) => (state: IRootState) =>
    createSelector(
      [
        draggingSelector,
        (_, activityReportId: Id) => activityReportId,
      ],
      (dragging: Set<string>, key: string) => dragging.has(key)
    )(state, activityReportId);
