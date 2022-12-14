import { FC, memo } from "react";
import cls from "classnames";
import {
  CancelableSelectionPointerProps,
  WithCancelableSelectionPointer,
} from "report/shared/components/cancelable-selection-pointer-events.hoc";
import { Typography } from "antd";

const CellPointerListener = WithCancelableSelectionPointer(() => (
  <Typography.Text disabled>H</Typography.Text>
));

interface Props extends CancelableSelectionPointerProps {}

export const HolidayCell: FC<Props> = memo((props) => {
  const className = cls("td", "cell-holiday");
  return <CellPointerListener {...props} className={className} />;
});

HolidayCell.displayName = "HolidayCell";
