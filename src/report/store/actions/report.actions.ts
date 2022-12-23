import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  Selection,
  SheetCellStatus,
} from "report/table/common-types";
import { Id } from "utils/types";
import { ReportState } from "../report.state";

export type RemoveActivitiesPayload = Selection;
type RemoveActivitiesAction = CaseReducer<
  ReportState,
  PayloadAction<RemoveActivitiesPayload>
>;
export const removeActivitiesAction: RemoveActivitiesAction = (
  state,
  action
) => {
  const selection = action.payload;

  for (const reportId in selection) {
    const activityReport = state.entities[reportId];
    const activities = selection[reportId];

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
  ReportState,
  PayloadAction<ApproveActivitiesPayload>
>;
export const approveActivitiesAction: ApproveActivitiesAction = (
  state,
  action
) => {
  const selection = action.payload;

  for (const reportId in selection) {
    const activityReport = state.entities[reportId];
    const activities = selection[reportId];

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
  ReportState,
  PayloadAction<RejectActivitiesPayload>
>;
export const rejectActivitiesAction: RejectActivitiesAction = (
  state,
  action
) => {
  const selection = action.payload;

  for (const reportId in selection) {
    const activityReport = state.entities[reportId];
    const activities = selection[reportId];

    for (const day of activities) {
      if (!activityReport.entities[day]) {
        throw new Error(`Cannot reject an undeclared activity of ${day}`);
      } else {
        activityReport.entities[day].status = SheetCellStatus.REJECTED;
      }
    }
  }
};

export type ToggleActivitiesStatusPayload = Selection;
type ToggleActivitiesStatusAction = CaseReducer<
  ReportState,
  PayloadAction<ToggleActivitiesStatusPayload>
>;
export const toggleActivitiesStatusAction: ToggleActivitiesStatusAction = (
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

  const hasAllSameStatus = (selection: Set<Id>, reportId: Id) => {
    let status;
    for (const day of selection) {
      if (!status) {
        status = state.entities[reportId].entities[day].status;
        continue;
      }
      if (state.entities[reportId].entities[day].status != status)
        return false;
    }

    return true;
  };

  for (const reportId in selection) {
    const activityReport = state.entities[reportId];
    const activities = selection[reportId];
    const allHasSameStatus = hasAllSameStatus(activities, reportId);
    const firstStatus = getFirstStatus(
      selection[reportId],
      reportId
    );
    const status: SheetCellStatus =
      allHasSameStatus || firstStatus === SheetCellStatus.PENDING
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

export type ApproveAllPayload = Id;
type ApproveAllAction = CaseReducer<
  ReportState,
  PayloadAction<ApproveAllPayload>
>;
export const approveAllAction: ApproveAllAction = (state, action) => {
  const reportId = action.payload;
  for (const activity of Object.values(
    state.entities[reportId].entities
  )) {
    activity.status = SheetCellStatus.APPROVED;
  }
};

export type RejectAllPayload = Id;
type RejectAllAction = CaseReducer<
  ReportState,
  PayloadAction<RejectAllPayload>
>;
export const rejectAllAction: RejectAllAction = (state, action) => {
  const reportId = action.payload;
  for (const activity of Object.values(
    state.entities[reportId].entities
  )) {
    activity.status = SheetCellStatus.REJECTED;
  }
};
