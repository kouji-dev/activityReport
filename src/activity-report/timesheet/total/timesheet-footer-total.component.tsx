import { TimesheetColumnTotal } from "./timesheet-column-total.component";
import { HeadCol } from "../head/timesheet-head.component";
import { TimesheetTotal } from "./timesheet-total.component";
import { useSheetColumns } from "utils/date-utils";

export const TimesheetFooterTotal = () => {
  const columns = useSheetColumns();

  return (
    <tfoot>
      <tr>
        <td colSpan={3}>Total</td>
        {columns.map((col: HeadCol, key) => (
          <TimesheetColumnTotal key={key} {...col} />
        ))}
        <TimesheetTotal />
      </tr>
    </tfoot>
  );
};
