import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Id } from "../../../utils/types";
import { activityReportTotalSelector } from "../../store/selectors/activity-report-sheet.selectors";

interface Props {
  activityReportId: Id;
}

export const TimesheetRowTotal: FC<Props> = (props) => {
  const { activityReportId } = props;
  const total = useSelector(activityReportTotalSelector(activityReportId));
  return <td className="total-row">{total}</td>;
};
