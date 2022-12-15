import { createSelector } from "@reduxjs/toolkit";
import { SheetStatus } from "activity-report/sheet-status";
import {
  Cells,
  SheetCell,
  SheetMode,
  SheetRows,
  SheetRowsRecords,
} from "activity-report/timesheet/common-types";
import { IActivityReport } from "models/activity-report.model";
import { IStandardActivity } from "models/standard-activity.model";
import { IRootState } from "store";
import { Id } from "utils/types";
import { ActivityReportSheetState } from "../activity-report-sheet.state";
import { uniq } from "lodash";
import { extractActivityReportStatus } from "activity-report/shared/activity-report.utils";
import { selectionSelector } from "./activity-report-sheet-selection.selectors";

const selectRoot = (state: IRootState) => state.activityReport;

export const activityReportIdsSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetState) => state.ids
);
export const activityReportMonthSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetState) => state.month
);
const sheetDataSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetState) => state.entities
);
export const isSheetEditableSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetState) => state.editable
);
export const sheetModeSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetState) => state.mode
);
export const isSheetModeEditSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetState) => state.mode == SheetMode.EDITTING
);
export const isSheetLoading = createSelector(
  selectRoot,
  (state: ActivityReportSheetState) => state.loading
);
export const sheetGlobalStatusSelector = createSelector(
  [sheetDataSelector],
  (entities: SheetRows<IActivityReport, IStandardActivity>) => {
    const sheetStatus: SheetStatus[] = [];

    Object.keys(entities).forEach((activityReportId) => {
      const activityReport = entities[activityReportId].meta;
      sheetStatus.push(extractActivityReportStatus(activityReport));
    });

    return uniq(sheetStatus);
  }
);
export const activityReportSelector = createSelector(
  [sheetDataSelector, (_, activityReportId) => activityReportId],
  (entities, activityReportId) => entities[activityReportId]
);
const activitiesSelector = createSelector(
  [activityReportSelector],
  (row) => row && row.entities
);
export const activitySelector =
  (activityReportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [activitiesSelector],
      (activities) => activities && activities[day]
    )(state, activityReportId, day);

export const hasActivitySelector =
  (activityReportId: Id, day: string) => (state: IRootState) =>
    createSelector([activitySelector(activityReportId, day)], (cell) => !!cell)(
      state,
      activityReportId,
      day
    );

export const activityStatusSelector =
  (activityReportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [activitySelector(activityReportId, day)],
      (c) => c && c.status
    )(state, activityReportId, day);

export const activityReportTotalSelector =
  (activityReportId: Id) => (state: IRootState) =>
    createSelector(
      sheetDataSelector,
      activitiesSelector,
      (_, entities: Cells) => {
        return Object.keys(entities).reduce((acc, key) => {
          const cell: SheetCell<IStandardActivity> = entities[key];
          let sum = 0;

          if (cell) {
            const { afternoon, morning } = cell;

            if (afternoon) sum += 0.5;
            if (morning) sum += 0.5;
          }
          return acc + sum;
        }, 0);
      }
    )(state, activityReportId);

export const dayTotalSelector = (day: string) => (state: IRootState) =>
  createSelector(
    activityReportIdsSelector,
    sheetDataSelector,
    (_, day) => day,
    (ids, entities: SheetRows<IActivityReport, IStandardActivity>, day) => {
      return ids.reduce((total, id) => {
        const cell: SheetCell<IStandardActivity> = entities[id].entities[day];
        let sum = 0;

        if (cell) {
          const { afternoon, morning } = cell;

          if (afternoon) sum += 0.5;
          if (morning) sum += 0.5;
        }
        return total + sum;
      }, 0);
    }
  )(state, day);

export const sheetTotalSelector = createSelector(
  sheetDataSelector,
  (entities: SheetRows<IActivityReport, IStandardActivity>) => {
    return Object.keys(entities).reduce((total, activityReportId) => {
      const cells: Cells<IStandardActivity> =
        entities[activityReportId].entities;
      return (
        total +
        Object.keys(cells).reduce((cellsTotal, cellId) => {
          const cell: SheetCell<IStandardActivity> = cells[cellId];
          let sum = 0;

          if (cell) {
            const { afternoon, morning } = cell;

            if (afternoon) sum += 0.5;
            if (morning) sum += 0.5;
          }
          return cellsTotal + sum;
        }, 0)
      );
    }, 0);
  }
);

export const canSubmitSelector = createSelector(
  [sheetDataSelector, isSheetModeEditSelector, selectionSelector],
  (
    entities: SheetRowsRecords,
    isSheetEditting: boolean,
    selection: Record<string, Set<string>>
  ) =>
    isSheetEditting &&
    Object.keys(selection).length &&
    Object.keys(entities).some(
      (activityReportId) => !entities[activityReportId]?.meta?.submitted
    )
);

export const cellTotalSelector =
  (activityReportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [activitySelector(activityReportId, day)],
      (cell: SheetCell<IStandardActivity>) => {
        if (!cell) return undefined;
        const { morning, afternoon } = cell;
        let total = undefined;
        if (morning?.is) total = +1;
        if (afternoon?.is) total = +1;
        return total;
      }
    )(state, activityReportId, day);
