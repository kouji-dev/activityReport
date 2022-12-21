import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  getDefaultHalfDay,
  Selection,
  SheetCellStatus,
} from "activity-report/timesheet/common-types";
import { ActivityReportSheetState } from "../activity-report-sheet.state";

export type RemoveActivitiesPayload = Selection;
type RemoveActivitiesAction = CaseReducer<
  ActivityReportSheetState,
  PayloadAction<RemoveActivitiesPayload>
>;
export const removeActivitiesAction: RemoveActivitiesAction = (
  state,
  action
) => {
  const selection = action.payload;

  for (const activityReportId in selection) {
    const activityReport = state.entities[activityReportId];
    const activities = selection[activityReportId];

    activityReport.ids = activityReport.ids.filter(
      (id) => !activities.includes(id)
    );

    for (const day of activities) {
      if (activityReport.entities[day]) {
        delete activityReport.entities[day];
      }
    }
  }
};

export type ApproveActivitiesPayload = Selection;
type ApproveActivitiesAction = CaseReducer<
  ActivityReportSheetState,
  PayloadAction<ApproveActivitiesPayload>
>;
export const approveActivitiesAction: ApproveActivitiesAction = (
  state,
  action
) => {
  const selection = action.payload;

  for (const activityReportId in selection) {
    const activityReport = state.entities[activityReportId];
    const activities = selection[activityReportId];

    for (const day of activities) {
      if (!activityReport.entities[day]) {
        throw new Error(`Cannot approve an undeclared activity of ${day}`);
      } else {
        activityReport.entities[day].status = SheetCellStatus.APPROVED;
      }
    }
  }
};

export type RejectActivitiesPayload = Selection;
type RejectActivitiesAction = CaseReducer<
  ActivityReportSheetState,
  PayloadAction<RejectActivitiesPayload>
>;
export const rejectActivitiesAction: RejectActivitiesAction = (
  state,
  action
) => {
  const selection = action.payload;

  for (const activityReportId in selection) {
    const activityReport = state.entities[activityReportId];
    const activities = selection[activityReportId];

    for (const day of activities) {
      if (!activityReport.entities[day]) {
        throw new Error(`Cannot reject an undeclared activity of ${day}`);
      } else {
        activityReport.entities[day].status = SheetCellStatus.REJECTED;
      }
    }
  }
};
