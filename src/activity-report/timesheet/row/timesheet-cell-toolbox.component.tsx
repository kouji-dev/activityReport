import { FC } from "react";
import { Id } from "../../../utils/types";

interface Props {
  activityReportId: Id;
}
export const TimesheetCellToolbox: FC<Props> = () => {
  const rootCls = "toolBox";
  return <td colSpan={2} className={rootCls}></td>;
};
