import { Typography } from "antd";
import React, { FC, memo, PointerEventHandler, useMemo } from "react";
import { useSelector } from "react-redux";
import { Id } from "../../../utils/types";
import { activitySelector } from "../../activity-report-sheet.selectors";
import { HeadCol } from "../head/timesheet-head.component";
import { TimesheetCellSelectionLayer } from "./selection/timesheet-cell-selection-layer.component";
import cls from "classnames";
import { useTimesheetSelectionActions } from "./selection/timesheet-selection.context";
import { hasClass } from "../../../utils/classname-utils";
import { getKey } from "../../../utils/sheet-utils";

interface Props extends HeadCol {
  activityReportId: Id;
}

export const TimesheetCell: FC<Props> = memo((props) => {
  const { isDisabled, isHoliday, isWeekend, activityReportId, day } = props;

  if (isDisabled) return <DisabledTimesheetCell />;
  if (isHoliday) return <HolidayTimesheetCell />;
  if (isWeekend) return <WeekendTimesheetCell />;

  return <DefaultTimesheetCell activityReportId={activityReportId} day={day} />;
});

TimesheetCell.displayName = "TimesheetCell";

interface DefaultCellProps {
  activityReportId: Id;
  day: string;
}

const DefaultTimesheetCell: FC<DefaultCellProps> = memo((props) => {
  const { activityReportId, day } = props;
  const cell = useSelector(activitySelector(activityReportId, day));
  const { startDrag, endDrag, onMove } = useTimesheetSelectionActions(
    activityReportId,
    day
  );

  const rootCls = "cell";

  const key = useMemo(() => getKey(activityReportId, day), []);

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (ev) => {
    console.log({ source: "down", ev });
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
    if (hasClass(ev, rootCls))
      console.log({
        source: "cancel",
        ev,
      });
  };

  const onPointerCancelCapture: PointerEventHandler<HTMLDivElement> = (ev) => {
    if (hasClass(ev, rootCls))
      console.log({
        source: "cancel capture",
        ev,
      });
  };

  const className = cls({
    cell: !!cell,
  });

  if (!cell) return <EmptyTimesheetCell />;

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

DefaultTimesheetCell.displayName = "DefaultTimesheetCell";

const EmptyTimesheetCell = memo(() => {
  const className = cls("cell", "cell-empty");
  return <td className={className} />;
});

EmptyTimesheetCell.displayName = "EmptyTimesheetCell";

const DisabledTimesheetCell = memo(() => {
  const className = cls("cell", "cell-disabled");
  return (
    <td className={className}>
      <Typography.Text>D</Typography.Text>
    </td>
  );
});

const HolidayTimesheetCell = memo(() => {
  const className = cls("cell", "cell-holiday");
  return (
    <td className={className}>
      <Typography.Text>H</Typography.Text>
    </td>
  );
});

const WeekendTimesheetCell = memo(() => {
  const className = cls("cell", "cell-weekend");
  return (
    <td className={className}>
      <Typography.Text>
        <small>W</small>
      </Typography.Text>
    </td>
  );
});

WeekendTimesheetCell.displayName = "WeekendTimesheetCell";
