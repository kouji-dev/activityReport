import { FC, memo } from "react";
import cls from "classnames";
import { useSelector } from "react-redux";
import { hasActivitySelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { EmptyCell } from "./empty-cell.component";
import { TimesheetCellSelectionLayer } from "./layers/timesheet-cell-selection-layer.component";
import {
  CancelableSelectionPointerProps,
  WithCancalableSelectionPointer,
} from "activity-report/shared/components/cancelable-selection-pointer-events.hoc";
import { CellContent } from "./cell-content.component";

const CellPointerListener = WithCancalableSelectionPointer(
  ({ activityReportId, day }: CancelableSelectionPointerProps) => (
    <>
      <CellContent activityReportId={activityReportId} day={day} />
      <TimesheetCellSelectionLayer
        activityReportId={activityReportId}
        day={day}
      />
    </>
  )
);

interface Props extends CancelableSelectionPointerProps {}

export const DefaultCell: FC<Props> = memo((props) => {
  const { activityReportId, day } = props;
  const className = cls("cell");
  const hasCell = useSelector(hasActivitySelector(activityReportId, day));

  if (!hasCell)
    return <EmptyCell activityReportId={activityReportId} day={day} />;

  return <CellPointerListener {...props} className={className} />;
});

DefaultCell.displayName = "DefaultCell";
