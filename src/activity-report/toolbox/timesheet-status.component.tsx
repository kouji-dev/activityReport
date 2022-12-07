import { SheetStatus } from "activity-report/sheet-status";
import { sheetGlobalStatusSelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { useSelector } from "react-redux";

export const TimesheetStatus = () => {
  const sheetStatus: SheetStatus[] = useSelector(sheetGlobalStatusSelector);
  return (
    <div>
      {sheetStatus?.map((status, i) => <div key={i}>i</div>)}
    </div>
      );
};
