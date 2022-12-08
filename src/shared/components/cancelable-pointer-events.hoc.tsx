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
      }),
      []
    );
    const { startDrag, onMove, onRangeMove, endDrag } =
      useTimesheetSelectionApi(payload);
    const isCtrlActive = useRef(false);

    const rootCls = "cell";

    const onPointerDown: PointerEventHandler<HTMLDivElement> = (ev) => {
      if (hasClass(ev, rootCls)) {
        console.log("down");
        isCtrlActive.current = ev.ctrlKey;
        startDrag();
      }
    };

    const onPointerMove: PointerEventHandler<HTMLDivElement> = (ev) => {
      if (!hasClass(ev, rootCls)) return;
      console.log({
        ctrl: isCtrlActive.current,
        activityReportId,
      });
      if (isCtrlActive.current) {
        onRangeMove();
      } else {
        onMove();
      }
    };

    const resetCtrl = () => (isCtrlActive.current = false);
    const onCancel = (ev) => {
      if (hasClass(ev, rootCls)) {
        resetCtrl();
        endDrag();
      }
    };

    const onPointerUp: PointerEventHandler<HTMLDivElement> = (ev) => {
      console.log("up");
      onCancel(ev);
    };
    const onPointerCancel: PointerEventHandler<HTMLDivElement> = (ev) => {
      console.log("cancel");
      onCancel(ev);
    };

    const onPointerCancelCapture: PointerEventHandler<HTMLDivElement> = (
      ev
    ) => {
      console.log("cancel");
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
