import { FC, memo } from "react";
import cls from "classnames";
import {
  CancelableSelectionPointerProps,
  WithCancalableSelectionPointer,
} from "activity-report/shared/components/cancelable-selection-pointer-events.hoc";
import { TimesheetCellSelectionLayer } from "./layers/timesheet-cell-selection-layer.component";

const CellPointerListener = WithCancalableSelectionPointer(
  ({ activityReportId, day }: CancelableSelectionPointerProps) => (
    <TimesheetCellSelectionLayer
      activityReportId={activityReportId}
      day={day}
    />
  )
);

interface Props extends CancelableSelectionPointerProps {}

export const EmptyCell: FC<Props> = memo((props) => {
  const className = cls("td", "cell-empty");
  return <CellPointerListener {...props} className={className} />;
});

EmptyCell.displayName = "EmptyCell";
