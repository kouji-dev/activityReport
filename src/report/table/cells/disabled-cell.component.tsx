import { FC, memo } from "react";
import cls from "classnames";
import {
  CancelableSelectionPointerProps,
  WithCancelableSelectionPointer,
} from "report/shared/components/cancelable-selection-pointer-events.hoc";
import { Typography } from "antd";

const CellPointerListener = WithCancelableSelectionPointer(() => (
  <Typography.Text disabled />
));

interface Props extends CancelableSelectionPointerProps {}

export const DisabledCell: FC<Props> = memo((props) => {
  const className = cls("td", "cell-disabled");
  return <CellPointerListener {...props} className={className} />;
});

DisabledCell.displayName = "DisabledCell";
