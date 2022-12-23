import { createSelector } from "@reduxjs/toolkit";
import { ReportStatus } from "report/report-status";
import {
  Cells,
  SheetCell,
  SheetMode,
  SheetRows,
  SheetRowsRecords,
} from "report/table/common-types";
import { IReport } from "models/report.model";
import { IActivity } from "models/activity.model";
import { IRootState } from "store";
import { Id } from "utils/types";
import { ReportState } from "../report.state";
import { uniq } from "lodash";
import { extractSheetStatus } from "report/shared/report.utils";
import { selectionSelector } from "./report-selection.selectors";

const selectRoot = (state: IRootState) => state.report;

export const reportIdsSelector = createSelector(
  selectRoot,
  (state: ReportState) => state.ids
);

const entitiesSelector = createSelector(
  selectRoot,
  (state: ReportState) => state.entities
);

export const isLoadingSelector = createSelector(
    selectRoot,
    (state: ReportState) => state.loading
);

export const reportMonthSelector = createSelector(
    selectRoot,
    (state: ReportState) => state.month
);

export const modeSelector = createSelector(
  selectRoot,
  (state: ReportState) => state.mode
);
export const isEditingSelector = createSelector(
  selectRoot,
  (state: ReportState) => state.mode == SheetMode.EDITTING
);

export const reportStatusSelector = createSelector(
  [entitiesSelector],
  (entities: SheetRows<IReport, IActivity>) => {
    const activities: SheetCell<IActivity>[] = [];
    const reports: IReport[] = [];

    Object.keys(entities).forEach((reportId) => {
      const report = entities[reportId];
      activities.push(...Object.values(report.entities));
      reports.push(report.meta);
    });

    const sheetStatus: ReportStatus[] = extractSheetStatus(reports, activities);

    return uniq(sheetStatus);
  }
);
export const reportSelector = createSelector(
  [entitiesSelector, (_, reportId) => reportId],
  (entities, reportId) => entities[reportId]
);
const activitiesSelector = createSelector(
  [reportSelector],
  (row) => row && row.entities
);
export const activitySelector =
  (reportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [activitiesSelector],
      (activities) => activities && activities[day]
    )(state, reportId, day);

export const hasActivitySelector =
  (reportId: Id, day: string) => (state: IRootState) =>
    createSelector([activitySelector(reportId, day)], (cell) => !!cell)(
      state,
      reportId,
      day
    );
export const isDisabledActivitySelector =
  (reportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [hasActivitySelector(reportId, day), isEditingSelector],
      (hasActivity, isEditable) => !hasActivity && !isEditable
    )(state, reportId, day);

export const canSelect =
  (reportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [hasActivitySelector(reportId, day), modeSelector],
      (hasCell: boolean, sheetMode: SheetMode) =>
        sheetMode === SheetMode.EDITTING || hasCell
    )(state, reportId, day);

export const activityStatusSelector =
  (reportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [activitySelector(reportId, day)],
      (c) => c && c.status
    )(state, reportId, day);

export const reportTotalSelector =
  (reportId: Id) => (state: IRootState) =>
    createSelector(
      entitiesSelector,
      activitiesSelector,
      (_, entities: Cells<IActivity>) => {
        return Object.keys(entities).reduce((acc, key) => {
          const cell: SheetCell<IActivity> = entities[key];
          let sum = 0;

          if (cell) {
            const { afternoon, morning } = cell;

            if (afternoon) sum += 0.5;
            if (morning) sum += 0.5;
          }
          return acc + sum;
        }, 0);
      }
    )(state, reportId);

export const dayTotalSelector = (day: string) => (state: IRootState) =>
  createSelector(
    reportIdsSelector,
    entitiesSelector,
    (_, day) => day,
    (ids, entities: SheetRows<IReport, IActivity>, day) => {
      return ids.reduce((total, id) => {
        const cell: SheetCell<IActivity> = entities[id].entities[day];
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
  entitiesSelector,
  (entities: SheetRows<IReport, IActivity>) => {
    return Object.keys(entities).reduce((total, reportId) => {
      const cells: Cells<IActivity> =
        entities[reportId].entities;
      return (
        total +
        Object.keys(cells).reduce((cellsTotal, cellId) => {
          const cell: SheetCell<IActivity> = cells[cellId];
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
  [entitiesSelector, isEditingSelector, selectionSelector],
  (
    entities: SheetRowsRecords,
    isEditing: boolean,
    selection: Record<string, Set<string>>
  ) =>
    isEditing &&
    Object.keys(selection).length &&
    Object.keys(entities).some(
      (reportId) => !entities[reportId]?.meta?.submitted
    )
);

export const cellTotalSelector =
  (reportId: Id, day: string) => (state: IRootState) =>
    createSelector(
      [activitySelector(reportId, day)],
      (cell: SheetCell<IActivity>) => {
        if (!cell) return undefined;
        const { morning, afternoon } = cell;
        let total = undefined;
        if (morning?.is) total = +1;
        if (afternoon?.is) total = +1;
        return total;
      }
    )(state, reportId, day);
