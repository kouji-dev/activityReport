import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Selection } from "activity-report/timesheet/common-types";
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
