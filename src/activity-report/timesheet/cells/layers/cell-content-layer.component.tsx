import { cellTotalSelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { Id } from "utils/types";

interface Props {
  activityReportId: Id;
  day: string;
}

export const CellContentLayer: FC<Props> = memo((props) => {
  const { activityReportId, day } = props;
  const total = useSelector(cellTotalSelector(activityReportId, day));
  const rootCls = "cell-content";
  return <div className={rootCls}>{total}</div>;
});
