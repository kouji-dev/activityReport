import { FC, memo } from "react";
import cls from "classnames";
import {
  CancelableSelectionPointerProps,
  WithCancalableSelectionPointer,
} from "activity-report/shared/components/cancelable-selection-pointer-events.hoc";
import { Typography } from "antd";

const CellPointerListener = WithCancalableSelectionPointer(() => (
  <Typography.Text disabled />
));

interface Props extends CancelableSelectionPointerProps {}

export const DisabledCell: FC<Props> = memo((props) => {
  const className = cls("td", "cell-disabled");
  return <CellPointerListener {...props} className={className} />;
});

DisabledCell.displayName = "DisabledCell";
