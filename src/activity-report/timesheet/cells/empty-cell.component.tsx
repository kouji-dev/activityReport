import { FC, memo } from "react";
import cls from "classnames";
import { TimesheetCellSelectionLayer } from "../selection/timesheet-cell-selection-layer.component";
import { CancelablePointerProps, WithCancalablePointer } from "activity-report/shared/components/cancelable-pointer-events.hoc";

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
