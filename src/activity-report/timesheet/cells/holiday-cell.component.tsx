import { FC, memo } from "react";
import cls from "classnames";
import {
  CancelablePointerProps,
  WithCancalablePointer,
} from "activity-report/shared/components/cancelable-pointer-events.hoc";

const CellPointerListener = WithCancalablePointer(() => <>H</>);

interface Props extends CancelablePointerProps {}

export const HolidayCell: FC<Props> = memo((props) => {
  const className = cls("cell", "cell-disabled");
  return <CellPointerListener {...props} className={className} />;
});

HolidayCell.displayName = "HolidayCell";
