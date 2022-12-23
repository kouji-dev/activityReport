import { FC, memo } from "react";
import cls from "classnames";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { SheetCellStatus } from "report/table/common-types";
import { Id } from "utils/types";
import { COLORS } from "report/shared/colors";
import {isCellInSelectionSelector, isCellSelectedSelector} from "@store/selectors/report-selection.selectors";
import {activityStatusSelector} from "@store/selectors/report.selectors";

interface Props {
  reportId: Id;
  day: string;
}

export const CellSelectionLayer: FC<Props> = memo((props) => {
  const { reportId, day } = props;
  const selecting = useSelector(isCellSelectedSelector(reportId, day));
  const selected = useSelector(
    isCellInSelectionSelector(reportId, day)
  );
  const status = useSelector(activityStatusSelector(reportId, day));

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
