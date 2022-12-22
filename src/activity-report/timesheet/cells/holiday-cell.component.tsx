import { FC, memo } from "react";
import cls from "classnames";
import {
  CancelableSelectionPointerProps,
  WithCancalableSelectionPointer,
} from "activity-report/shared/components/cancelable-selection-pointer-events.hoc";
import { Typography } from "antd";

const CellPointerListener = WithCancalableSelectionPointer(() => (
  <Typography.Text disabled>H</Typography.Text>
));

interface Props extends CancelableSelectionPointerProps {}

export const HolidayCell: FC<Props> = memo((props) => {
  const className = cls("cell", "cell-holiday");
  return <CellPointerListener {...props} className={className} />;
});

HolidayCell.displayName = "HolidayCell";
