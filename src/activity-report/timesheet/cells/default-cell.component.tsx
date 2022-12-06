import { hasActivitySelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { FC, memo, PointerEventHandler, useMemo } from "react";
import { useSelector } from "react-redux";
import { hasClass } from "utils/classname-utils";
import { getKey } from "utils/sheet-utils";
import { useTimesheetSelectionApi } from "../row/selection/redux/use-timesheet-selection-api.hook";
import cls from "classnames";
import { EmptyCell } from "./empty-cell.component";
import { TimesheetCellSelectionLayer } from "../row/selection/timesheet-cell-selection-layer.component";
import { Id } from "utils/types";

interface DefaultCellProps {
  activityReportId: Id;
  day: string;
}

export const DefaultCell: FC<DefaultCellProps> = memo((props) => {
  const { activityReportId, day } = props;
  const hasCell = useSelector(hasActivitySelector(activityReportId, day));
  const key = useMemo(() => getKey(activityReportId, day), []);
  const { startDrag, endDrag, onMove } = useTimesheetSelectionApi(key);

  const rootCls = "cell";

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (ev) => {
    if (hasClass(ev, rootCls)) {
      startDrag(key);
    }
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (ev) => {
    if (hasClass(ev, rootCls)) {
      onMove(key);
    }
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (ev) => {
    if (hasClass(ev, rootCls)) {
      endDrag(key);
    }
  };

  const onPointerCancel: PointerEventHandler<HTMLDivElement> = (ev) => {
    if (hasClass(ev, rootCls)) endDrag(key);
  };

  const onPointerCancelCapture: PointerEventHandler<HTMLDivElement> = (ev) => {
    if (hasClass(ev, rootCls)) endDrag(key);
  };

  const className = cls({
    cell: hasCell,
  });

  if (!hasCell)
    return <EmptyCell activityReportId={activityReportId} day={day} />;

  return (
    <td
      className={className}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onPointerCancelCapture={onPointerCancelCapture}
    >
      1
      <TimesheetCellSelectionLayer
        activityReportId={activityReportId}
        day={day}
      />
    </td>
  );
});

DefaultCell.displayName = "DefaultTimesheetCell";
