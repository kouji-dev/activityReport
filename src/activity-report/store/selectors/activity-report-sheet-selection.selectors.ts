import { Range, RangeDirection } from "activity-report/timesheet/common-types";
import moment from "moment";
import { createSelector } from "utils/store-utils";
import { Id } from "utils/types";
import { IRootState } from "../../../store";
import { ActivityReportSheetSelectionState } from "../activity-report-sheet-selection.state";

const selectRoot = (state: IRootState) => state.activityReportSelection;

const isHoldingCtrlSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetSelectionState) => state.ctrl
);

export const selectionSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetSelectionState) => state.selection
);

const draggingSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetSelectionState) => state.dragging
);

const rangeSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetSelectionState) => state.range
);

const rangeDirectionSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetSelectionState) => state.rangeDirection
);

export const isDraggingSelector = createSelector(
      [draggingSelector],
      (dragging: Set<string>) => dragging.size > 0
)

export const isDraggingRowSelector =
  (activityReportId: Id) => (state: IRootState) =>
    createSelector(
      [draggingSelector, (_, activityReportId: Id) => activityReportId],
      (dragging: Set<string>, key: string) => dragging.has(key)
    )(state, activityReportId);

export const isCellSelectedSelector =
  (activityReportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [
        isCellInSelectionSelector(activityReportId, day),
        isCellInRangeSelector(activityReportId, day),
        isDraggingRowSelector(activityReportId),
        isHoldingCtrlSelector,
      ],
      (
        selected: boolean,
        inRange: boolean,
        isRowDragging: boolean,
        ctrl: boolean
      ) => (isRowDragging && ctrl ? inRange : selected)
    )(state, activityReportId, day);

export const isCellInRangeSelector =
  (activityReportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [
        rangeSelector,
        rangeDirectionSelector,
        isDraggingRowSelector(activityReportId),
        (_, __, day: string) => day,
      ],
      (
        [a, b]: Range,
        rangeDirection: RangeDirection,
        isDraggingRow: boolean,
        day: string
      ) => {
        const dates = rangeDirection == "increasing" ? [a, b] : [b, a];
        return isDraggingRow
          ? a && b && moment(day).isBetween(...dates, "date", "[]")
          : false;
      }
    )(state, activityReportId, day);

export const isCellInSelectionSelector =
  (activityReportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [
        selectionSelector,
        (_, activityReportId: Id) => activityReportId,
        (_, __, day: string) => day,
      ],
      (selection: Set<string>, activityReportId: Id, day: string) =>
        selection[activityReportId] && selection[activityReportId].has(day)
    )(state, activityReportId, day);
