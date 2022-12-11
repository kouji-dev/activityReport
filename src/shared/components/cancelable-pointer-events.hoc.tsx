import { RowCellIdentifiers } from "activity-report/timesheet/common-types";
import { useTimesheetSelectionApi } from "activity-report/timesheet/selection/use-timesheet-selection-api.hook";
import { PointerEventHandler, useMemo, useRef } from "react";
import { hasClass } from "utils/classname-utils";
import { getKey } from "utils/sheet-utils";
import { Id } from "utils/types";

export interface CancelablePointerProps {
  activityReportId: Id;
  day: string;
  className?: string;
}

export interface CancelablePointerEvents {
  onPointerCancel: PointerEventHandler<HTMLDivElement>;
  onPointerCancelCapture: PointerEventHandler<HTMLDivElement>;
}

export const WithCancalablePointer =
  <P extends CancelablePointerProps>(Component: any) =>
  (props: P) => {
    const { activityReportId, day, className } = props;

    const payload: RowCellIdentifiers = useMemo(
      () => ({
        key: getKey(activityReportId, day),
        rowKey: activityReportId,
        day,
        activityReportId,
      }),
      []
    );
    const { startDrag, onSelecting, endDrag, isHolidingCtrl } =
      useTimesheetSelectionApi(payload);

    const rootCls = "cell";

    const handleCtrl = (ev: any) => {
      isHolidingCtrl(ev.ctrlKey);
    };

    const onPointerDown: PointerEventHandler<HTMLDivElement> = (ev) => {
      handleCtrl(ev);
      if (hasClass(ev, rootCls)) {
        console.log("down");
        startDrag();
      }
    };

    const onPointerMove: PointerEventHandler<HTMLDivElement> = (ev) => {
      if (!hasClass(ev, rootCls)) return;
      onSelecting(ev.ctrlKey);
    };

    const resetCtrl = () => isHolidingCtrl(false);
    const onCancel = (ev) => {
      if (hasClass(ev, rootCls)) {
        console.log("cancel");
        endDrag();
        resetCtrl();
      }
    };

    const onPointerUp: PointerEventHandler<HTMLDivElement> = (ev) => {
      console.log("up");
      onCancel(ev);
    };
    const onPointerCancel: PointerEventHandler<HTMLDivElement> = (ev) => {
      onCancel(ev);
    };

    const onPointerCancelCapture: PointerEventHandler<HTMLDivElement> = (
      ev
    ) => {
      onCancel(ev);
    };

    return (
      <td
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerCancelCapture={onPointerCancelCapture}
        onPointerCancel={onPointerCancel}
        onPointerUp={onPointerUp}
        className={className}
      >
        <Component {...props} />
      </td>
    );
  };
