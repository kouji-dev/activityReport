import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  getDefaultHalfDay,
  Selection,
  SheetCellStatus,
} from "activity-report/timesheet/common-types";
import { Id } from "utils/types";
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

export type ToggleActivitisStatusPayload = Selection;
type ToggleActivitisStatusAction = CaseReducer<
  ActivityReportSheetState,
  PayloadAction<ToggleActivitisStatusPayload>
>;
export const toggleActivitisStatusAction: ToggleActivitisStatusAction = (
  state,
  action
) => {
  const selection = action.payload;

  const getFirstStatus = (s: Set<Id>, key: Id) => {
    const day = s.values().next().value;
    return state.entities[key].entities[day].status || SheetCellStatus.PENDING;
  };

  const toggleStatus = (status: SheetCellStatus) => {
    switch (status) {
      case SheetCellStatus.PENDING:
        return SheetCellStatus.APPROVED;
      case SheetCellStatus.APPROVED:
        return SheetCellStatus.REJECTED;
      case SheetCellStatus.REJECTED:
        return SheetCellStatus.APPROVED;
    }
  };

  const hasAllSameStatus = (selection: Set<Id>, activityReportId: Id) => {
    let status;
    for (const day of selection) {
      if (!status) {
        status = state.entities[activityReportId].entities[day].status;
        continue;
      }
      if (state.entities[activityReportId].entities[day].status != status)
        return false;
    }

    return true;
  };

  for (const activityReportId in selection) {
    const activityReport = state.entities[activityReportId];
    const activities = selection[activityReportId];
    const allHasSameStatus = hasAllSameStatus(activities, activityReportId);
    const firstStatus = getFirstStatus(
      selection[activityReportId],
      activityReportId
    );
    const status: SheetCellStatus = allHasSameStatus
      ? toggleStatus(firstStatus)
      : firstStatus;

    for (const day of activities) {
      if (!activityReport.entities[day]) {
        throw new Error(`Cannot reject an undeclared activity of ${day}`);
      } else {
        activityReport.entities[day].status = status;
      }
    }
  }
};
