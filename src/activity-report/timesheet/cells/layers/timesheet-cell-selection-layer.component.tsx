import { FC, memo } from "react";
import cls from "classnames";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { activityStatusSelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { SheetCellStatus } from "activity-report/timesheet/common-types";
import {
  isCellInSelectionSelector,
  isCellSelectedSelector,
} from "activity-report/store/selectors/activity-report-sheet-selection.selectors";
import { Id } from "utils/types";
import { COLORS } from "activity-report/shared/colors";

interface Props {
  activityReportId: Id;
  day: string;
}

export const TimesheetCellSelectionLayer: FC<Props> = memo((props) => {
  const { activityReportId, day } = props;
  const selecting = useSelector(isCellSelectedSelector(activityReportId, day));
  const selected = useSelector(
    isCellInSelectionSelector(activityReportId, day)
  );
  const status = useSelector(activityStatusSelector(activityReportId, day));

  const rootCls = "selection-layer";
  const className = cls(rootCls, {
    "td-in-range": selecting && !selected,
    "td-selected": selected,
    "td-approved": status == SheetCellStatus.APPROVED,
    "td-pending": status == SheetCellStatus.PENDING,
    "td-rejected": status == SheetCellStatus.REJECTED,
  });

  const content = <div className={className} />;

  if (selected) {
    let color;

    if (status == SheetCellStatus.APPROVED) {
      color = COLORS.GREEN;
    } else if (status == SheetCellStatus.REJECTED) {
      color = COLORS.RED;
    } else if (status == SheetCellStatus.PENDING) {
      color = COLORS.YELLOW;
    } else {
      color = COLORS.BLUE;
    }

    return (
      <Badge dot color={color} size="default">
        {content}
      </Badge>
    );
  }

  return content;
});
