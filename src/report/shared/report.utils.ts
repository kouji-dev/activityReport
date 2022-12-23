import { ReportStatus } from "report/report-status";
import { SheetCell } from "report/table/common-types";
import { IReport } from "models/report.model";
import { IActivity } from "models/activity.model";

export const extractSheetStatus: (
  reports: IReport[],
  activities: SheetCell<IActivity>[]
) => ReportStatus[] = (
  reports: IReport[],
  activities: SheetCell<IActivity>[]
) => {
  return [ReportStatus.NEW];
};
