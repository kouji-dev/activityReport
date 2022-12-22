import { Moment } from "moment";
import { FC, memo } from "react";
import { useSheetColumns } from "utils/date-utils";
import { Th, TableHeadToolbox, ThProject } from "./timesheet-th.component";

interface Props {}

export interface HeadCol {
  date: Moment;
  day: string;
  isWeekend?: boolean;
  isHoliday?: boolean;
}

export type HeadCols = HeadCol[];

export const TimesheetHead: FC<Props> = memo((props) => {
  const columns = useSheetColumns();

  return (
    <thead>
      <tr>
        <ThProject />
        {columns.map((col: HeadCol, key) => (
          <Th key={key} {...col} />
        ))}
        <TableHeadToolbox />
      </tr>
    </thead>
  );
});
