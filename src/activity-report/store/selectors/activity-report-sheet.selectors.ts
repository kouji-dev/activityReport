import { createSelector } from "@reduxjs/toolkit";
import { extractActivityReportStatus } from "@shared/activity-report.utils";
import { SheetStatus } from "activity-report/sheet-status";
import {
  Cells,
  SheetCell,
  SheetRows,
} from "activity-report/timesheet/common-types";
import { IActivityReport } from "models/activity-report.model";
import { IStandardActivity } from "models/standard-activity.model";
import { IRootState } from "store";
import { Id } from "utils/types";
import { ActivityReportSheetState } from "../activity-report-sheet.state";
import { uniq } from "lodash";

const selectRoot = (state: IRootState) => state.activityReport;

export const activityReportIdsSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetState) => state.ids
);

const sheetDataSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetState) => state.entities
);

export const isSheetEditableSelector = createSelector(
  selectRoot,
  (state: ActivityReportSheetState) => state.editable
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

export const sheetTotalSelector = (state: IRootState) =>
  createSelector(
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
  )(state);
