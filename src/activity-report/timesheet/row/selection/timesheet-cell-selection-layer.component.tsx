import { FC, memo } from "react";
import { Id } from "../../../../utils/types";
import cls from "classnames";
import { useSelector } from "react-redux";
import { isCellSelectedSelector } from "../../../store/selectors/activity-report-sheet-selection.selectors";
import { Badge } from "antd";
import { activityStatusSelector } from "activity-report/store/selectors/activity-report-sheet.selectors";

interface Props {
  activityReportId: Id;
  day: string;
}

export const TimesheetCellSelectionLayer: FC<Props> = memo((props) => {
  const { activityReportId, day } = props;
  const selected = useSelector(isCellSelectedSelector(activityReportId, day));
  // const status = useSelector(activityStatusSelector(activityReportId, day));

  const rootCls = "cell-selection-layer";
  const className = cls(rootCls, {
    "cell-selected": selected,
    "cell-dragging": false,
  });

  const content = <div className={className} />;

  if (selected) return <Badge dot>{content}</Badge>;

  return content;
});
