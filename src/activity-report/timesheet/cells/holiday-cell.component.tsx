import { FC, memo } from "react";
import cls from "classnames";
import {
  CancelableSelectionPointerProps,
  WithCancalableSelectionPointer,
} from "activity-report/shared/components/cancelable-selection-pointer-events.hoc";

const CellPointerListener = WithCancalableSelectionPointer(() => <>H</>);

interface Props extends CancelableSelectionPointerProps {}

export const HolidayCell: FC<Props> = memo((props) => {
  const className = cls("cell", "cell-disabled");
  return <CellPointerListener {...props} className={className} />;
});

HolidayCell.displayName = "HolidayCell";
