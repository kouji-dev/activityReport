import { SheetStatus } from "activity-report/sheet-status";
import { SheetCell } from "activity-report/timesheet/common-types";
import { IActivityReport } from "models/activity-report.model";
import { IStandardActivity } from "models/standard-activity.model";

export const extractSheetStatus: (
  reports: IActivityReport[],
  activities: SheetCell<IStandardActivity>[]
) => SheetStatus[] = (
  reports: IActivityReport[],
  activities: SheetCell<IStandardActivity>[]
) => {
  return SheetStatus.NEW;
};
