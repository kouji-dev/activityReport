import { memo } from "react";
import { TimesheetHead } from "./head/timesheet-head.component";
import { TimesheetBody } from "./timesheet-body.component";
import { TimesheetFooterTotal } from "./total/timesheet-footer-total.component";

export const TimesheetTable = memo(() => {
  return (
    <table>
      <TimesheetHead />
      <TimesheetBody />
      <TimesheetFooterTotal />
    </table>
  );
});
