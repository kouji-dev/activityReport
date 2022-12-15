import { useTimesheetSelectionApi } from "activity-report/hooks/use-timesheet-selection-api.hook";
import { RowCellIdentifiers } from "activity-report/timesheet/common-types";
import { FC, PointerEventHandler, useMemo } from "react";
import { hasClass } from "utils/classname-utils";
import { getKey } from "utils/sheet-utils";
import { Id } from "utils/types";
import { CancalablePointer } from "./cancelable-pointer-events.hoc";

export interface CancelableSelectionPointerProps {
  activityReportId: Id;
  day: string;
  className?: string;
}

export const WithCancalableSelectionPointer =
  <T extends CancelableSelectionPointerProps>(Component: FC<T>) =>
  (props: T) => {
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
      <CancalablePointer
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerCancelCapture={onPointerCancelCapture}
        onPointerCancel={onPointerCancel}
        onPointerUp={onPointerUp}
        className={className}
      >
        <Component {...props} />
      </CancalablePointer>
    );
  };
