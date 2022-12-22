import { activityReportTotalSelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Id } from "utils/types";

interface Props {
  activityReportId: Id;
}

export const TimesheetRowTotal: FC<Props> = (props) => {
  const { activityReportId } = props;
  const total = useSelector(activityReportTotalSelector(activityReportId));
  return <div className="td total-row">{total}</div>;
};
