import { TimesheetColumnTotal } from "./timesheet-column-total.component";
import { HeadCol } from "../head/timesheet-head.component";
import { TimesheetTotal } from "./timesheet-total.component";
import { useSheetColumns } from "utils/date-utils";

export const TimesheetFooterTotal = () => {
  const columns = useSheetColumns();

  return (
    <div className="tfoot">
      <div className="tf">Total</div>
      {columns.map((col: HeadCol, key) => (
        <TimesheetColumnTotal key={key} {...col} />
      ))}
      <TimesheetTotal />
    </div>
  );
};
