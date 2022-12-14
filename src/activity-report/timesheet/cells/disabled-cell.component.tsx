import { FC, memo } from "react";
import cls from "classnames";
import { CancelableSelectionPointerProps, WithCancalableSelectionPointer } from "activity-report/shared/components/cancelable-selection-pointer-events.hoc";

const CellPointerListener = WithCancalableSelectionPointer(() => <span>D</span>);

interface Props extends CancelableSelectionPointerProps {}

export const DisabledCell: FC<Props> = memo((props) => {
  const className = cls("cell", "cell-disabled");
  return <CellPointerListener {...props} className={className} />;
});

DisabledCell.displayName = "DisabledCell";
