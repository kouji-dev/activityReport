import { useSelector } from "react-redux";
import { SheetStatusItem } from "./sheet-status-item.component";
import {ReportStatus} from "../report-status";
import {reportStatusSelector} from "@store/selectors/report.selectors";

export const TimesheetStatus = () => {
  const sheetStatus: ReportStatus[] = useSelector(reportStatusSelector);
  return (
    <div>
      {sheetStatus?.map((status, i) => (
        <SheetStatusItem key={i} status={status} />
      ))}
    </div>
  );
};
