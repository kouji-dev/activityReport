import { FC, memo } from "react";
import {
  CancelableSelectionPointerProps,
  WithCancalableSelectionPointer,
} from "activity-report/shared/components/cancelable-selection-pointer-events.hoc";
import cls from "classnames";
const CellPointerListener = WithCancalableSelectionPointer(() => <>W</>);

interface Props extends CancelableSelectionPointerProps {}

export const WeekendCell: FC<Props> = memo((props) => {
  const className = cls("cell", "cell-disabled");
  return <CellPointerListener {...props} className={className} />;
});

WeekendCell.displayName = "WeekendCell";
