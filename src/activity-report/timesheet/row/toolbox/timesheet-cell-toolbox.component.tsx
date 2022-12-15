import { sheetModeSelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { SheetMode } from "activity-report/timesheet/common-types";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Id } from "utils/types";
import { SelectionToolboxCell } from "./selection-toolbox-cell.component";
import { ValidateToolboxCell } from "./validate-toolbox-cell.component";

interface Props {
  activityReportId: Id;
}
export const TimesheetCellToolbox: FC<Props> = (props) => {
  const { activityReportId } = props;
  const rootCls = "toolBox";
  const sheetMode: SheetMode = useSelector(sheetModeSelector);

  let content;

  switch (sheetMode) {
    case SheetMode.EDITTING:
      content = <SelectionToolboxCell activityReportId={activityReportId} />;
      break;
    case SheetMode.VALIDATING:
      content = <ValidateToolboxCell activityReportId={activityReportId} />;
      break;
    default:
      content = <></>;
  }
  return (
    <td colSpan={2} className={rootCls}>
      {content}
    </td>
  );
};
