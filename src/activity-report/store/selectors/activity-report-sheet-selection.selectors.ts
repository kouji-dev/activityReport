import { Range } from "activity-report/timesheet/common-types";
import moment from "moment";
import { getKey } from "utils/sheet-utils";
import { createSelector } from "utils/store-utils";
import { Id } from "utils/types";
import { IRootState } from "../../../store";
import { ActivityReportSheetSelectionState } from "../activity-report-sheet-selection.state";

const selectRoot = (state: IRootState) => state.activityReportSelection;

const isHoldingCtrlSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetSelectionState) => state.ctrl
);

const selectionSelector = createSelector(
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

const firstRangeItemSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetSelectionState) => state.range[0]
);

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

export const isFirstRangeItemCellSelector =
  (activityReportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [firstRangeItemSelector, (_, __, day: string) => day],
      (rangeDate, day: string) => (rangeDate ? rangeDate == day : false)
    )(state, activityReportId, day);

export const isCellInRangeSelector =
  (activityReportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [
        rangeSelector,
        isDraggingRowSelector(activityReportId),
        (_, __, day: string) => day,
      ],
      ([a, b]: Range, isDraggingRow: boolean, day: string) =>
        isDraggingRow
          ? a && b && moment(day).isBetween(a, b, "date", "(]")
          : false
    )(state, activityReportId, day);

export const isCellInSelectionSelector =
  (activityReportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [
        selectionSelector,
        (_, activityReportId: Id, day: string) => getKey(activityReportId, day),
      ],
      (selection: Set<string>, key: string) => selection.has(key)
    )(state, activityReportId, day);
