import { FC, memo } from "react";
import cls from "classnames";
import {
  CancelablePointerProps,
  WithCancalablePointer,
} from "@shared/components/cancelable-pointer-events.hoc";

const CellPointerListener = WithCancalablePointer(() => <span>D</span>);

interface Props extends CancelablePointerProps {}

export const DisabledCell: FC<Props> = memo((props) => {
  const className = cls("cell", "cell-disabled");
  return <CellPointerListener {...props} className={className} />;
});

DisabledCell.displayName = "DisabledCell";
