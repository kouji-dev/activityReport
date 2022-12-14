import { isSheetModeEditSelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Id } from "../../../utils/types";

interface Props {
  activityReportId: Id;
}
export const TimesheetCellToolbox: FC<Props> = (props) => {
  const {
    activityReportId
  } = props;
  const rootCls = "toolBox";
  const isEditting = useSelector(isSheetModeEditSelector);
  
  let content = <></>;
  if(isEditting) {
    content = <ValidateToolboxCell activityReportId={activityReportId}/>
  }
  return <td colSpan={2} className={rootCls}>{content}</td>;
};
