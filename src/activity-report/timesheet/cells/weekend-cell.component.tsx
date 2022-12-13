import { FC, memo } from "react";
import cls from "classnames";
import {
  CancelablePointerProps,
  WithCancalablePointer,
} from "activity-report/shared/components/cancelable-pointer-events.hoc";

const CellPointerListener = WithCancalablePointer(() => <>W</>);

interface Props extends CancelablePointerProps {}

export const WeekendCell: FC<Props> = memo((props) => {
  const className = cls("cell", "cell-disabled");
  return <CellPointerListener {...props} className={className} />;
});

WeekendCell.displayName = "WeekendCell";
