import { FC, memo } from "react";
import cls from "classnames";
import {
  CancelablePointerProps,
  WithCancalablePointer,
} from "@shared/components/cancelable-pointer-events.hoc";
import { TimesheetCellSelectionLayer } from "../selection/timesheet-cell-selection-layer.component";
import { useSelector } from "react-redux";
import { hasActivitySelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { EmptyCell } from "./empty-cell.component";

const CellPointerListener = WithCancalablePointer(
  ({ activityReportId, day }: CancelablePointerProps) => (
    <>
      1
      <TimesheetCellSelectionLayer
        activityReportId={activityReportId}
        day={day}
      />
    </>
  )
);

interface Props extends CancelablePointerProps {}

export const DefaultCell: FC<Props> = memo((props) => {
  const { activityReportId, day } = props;
  const className = cls("cell");
  const hasCell = useSelector(hasActivitySelector(activityReportId, day));

  if (!hasCell)
    return <EmptyCell activityReportId={activityReportId} day={day} />;

  return <CellPointerListener {...props} className={className} />;
});

DefaultCell.displayName = "DefaultCell";
