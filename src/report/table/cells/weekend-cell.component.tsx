import { FC, memo } from "react";
import {
  CancelableSelectionPointerProps,
  WithCancelableSelectionPointer,
} from "report/shared/components/cancelable-selection-pointer-events.hoc";
import cls from "classnames";
import { Typography } from "antd";
const CellPointerListener = WithCancelableSelectionPointer(() => (
  <Typography.Text disabled>W</Typography.Text>
));

interface Props extends CancelableSelectionPointerProps {}

export const WeekendCell: FC<Props> = memo((props) => {
  const className = cls("td", "cell-weekend");
  return <CellPointerListener {...props} className={className} />;
});

WeekendCell.displayName = "WeekendCell";
