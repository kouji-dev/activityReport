import { FC, memo } from "react";
import { HeadCol } from "../head/head.component";
import { HolidayCell } from "../cells/holiday-cell.component";
import { WeekendCell } from "../cells/weekend-cell.component";
import { DefaultCell } from "../cells/default-cell.component";
import {Id} from "@utils/types";

interface Props extends HeadCol {
  reportId: Id;
}

export const Cell: FC<Props> = memo((props) => {
  const { isHoliday, isWeekend, reportId, day } = props;
  if (isHoliday)
    return <HolidayCell reportId={reportId} day={day} />;
  if (isWeekend)
    return <WeekendCell reportId={reportId} day={day} />;

  return <DefaultCell reportId={reportId} day={day} />;
});

Cell.displayName = "Cell";
