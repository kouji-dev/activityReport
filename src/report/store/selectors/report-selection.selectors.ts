import { Range, RangeDirection } from "report/table/common-types";
import moment from "moment";
import { createSelector } from "utils/store-utils";
import { Id } from "utils/types";
import { IRootState } from "../../../store";
import { ReportSelectionState } from "../report-selection.state";

const selectRoot = (state: IRootState) => state.reportSelection;

const isHoldingCtrlSelector = createSelector(
  selectRoot,
  (state: ReportSelectionState) => state.ctrl
);

export const selectionSelector = createSelector(
  selectRoot,
  (state: ReportSelectionState) => state.selection
);

const draggingSelector = createSelector(
  selectRoot,
  (state: ReportSelectionState) => state.dragging
);

const rangeSelector = createSelector(
  selectRoot,
  (state: ReportSelectionState) => state.range
);

const rangeDirectionSelector = createSelector(
  selectRoot,
  (state: ReportSelectionState) => state.rangeDirection
);

export const isDraggingSelector = createSelector(
  [draggingSelector],
  (dragging: Set<string>) => dragging.size > 0
);

export const isDraggingRowSelector =
  (reportId: Id) => (state: IRootState) =>
    createSelector(
      [draggingSelector, (_, reportId: Id) => reportId],
      (dragging: Set<string>, key: string) => dragging.has(key)
    )(state, reportId);

export const isCellSelectedSelector =
  (reportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [
        isCellInSelectionSelector(reportId, day),
        isCellInRangeSelector(reportId, day),
        isDraggingRowSelector(reportId),
        isHoldingCtrlSelector,
      ],
      (
        selected: boolean,
        inRange: boolean,
        isRowDragging: boolean,
        ctrl: boolean
      ) => (isRowDragging && ctrl ? inRange : selected)
    )(state, reportId, day);

export const isCellInRangeSelector =
  (reportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [
        rangeSelector,
        rangeDirectionSelector,
        isDraggingRowSelector(reportId),
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
    )(state, reportId, day);

export const isCellInSelectionSelector =
  (reportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [
        selectionSelector,
        (_, reportId: Id) => reportId,
        (_, __, day: string) => day,
      ],
      (selection: Set<string>, reportId: Id, day: string) =>
        selection[reportId] && selection[reportId].has(day)
    )(state, reportId, day);
