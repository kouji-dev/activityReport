import { FC, memo } from "react";
import { Id } from "../../../utils/types";
import { HeadCol } from "../head/timesheet-head.component";
import { HolidayCell } from "../cells/holiday-cell.component";
import { WeekendCell } from "../cells/weekend-cell.component";
import { DefaultCell } from "../cells/default-cell.component";

interface Props extends HeadCol {
  activityReportId: Id;
}

export const TimesheetCell: FC<Props> = memo((props) => {
  const { isHoliday, isWeekend, activityReportId, day } = props;
  if (isHoliday)
    return <HolidayCell activityReportId={activityReportId} day={day} />;
  if (isWeekend)
    return <WeekendCell activityReportId={activityReportId} day={day} />;

  return <DefaultCell activityReportId={activityReportId} day={day} />;
});

TimesheetCell.displayName = "TimesheetCell";
