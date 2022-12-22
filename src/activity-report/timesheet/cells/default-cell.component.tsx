import { FC, memo } from "react";
import cls from "classnames";
import { useSelector } from "react-redux";
import {
  hasActivitySelector,
  isDisabledActivitySelector,
} from "activity-report/store/selectors/activity-report-sheet.selectors";
import { EmptyCell } from "./empty-cell.component";
import { TimesheetCellSelectionLayer } from "./layers/timesheet-cell-selection-layer.component";
import {
  CancelableSelectionPointerProps,
  WithCancalableSelectionPointer,
} from "activity-report/shared/components/cancelable-selection-pointer-events.hoc";
import { CellContentLayer } from "./layers/cell-content-layer.component";
import { DisabledCell } from "./disabled-cell.component";

const CellPointerListener = WithCancalableSelectionPointer(
  ({ activityReportId, day }: CancelableSelectionPointerProps) => (
    <>
      <CellContentLayer activityReportId={activityReportId} day={day} />
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
  const isDisabled = useSelector(
    isDisabledActivitySelector(activityReportId, day)
  );

  if (isDisabled) {
    return <DisabledCell activityReportId={activityReportId} day={day} />;
  }

  if (!hasCell)
    return <EmptyCell activityReportId={activityReportId} day={day} />;

  return <CellPointerListener {...props} className={className} />;
});

DefaultCell.displayName = "DefaultCell";
