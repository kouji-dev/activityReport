import { FC, Fragment, memo } from "react";
import cls from "classnames";
import {
  CancelablePointerProps,
  WithCancalablePointer,
} from "@shared/components/cancelable-pointer-events.hoc";
import { TimesheetCellSelectionLayer } from "../selection/timesheet-cell-selection-layer.component";

const CellPointerListener = WithCancalablePointer(
  ({ activityReportId, day }: CancelablePointerProps) => (
    <TimesheetCellSelectionLayer
      activityReportId={activityReportId}
      day={day}
    />
  )
);

interface Props extends CancelablePointerProps {}

export const EmptyCell: FC<Props> = memo((props) => {
  const className = cls("cell", "cell-empty");
  return <CellPointerListener {...props} className={className} />;
});

EmptyCell.displayName = "EmptyCell";
