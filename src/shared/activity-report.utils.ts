import { SheetStatus } from "activity-report/sheet-status";
import { IActivityReport } from "models/activity-report.model";

export const extractActivityReportStatus: (
  activityReport: IActivityReport
) => SheetStatus = (activityReport: IActivityReport) => {
  return SheetStatus.NEW;
};
