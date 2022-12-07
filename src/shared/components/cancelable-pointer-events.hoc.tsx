import { useTimesheetSelectionApi } from "activity-report/timesheet/selection/use-timesheet-selection-api.hook";
import { PointerEventHandler, useMemo } from "react";
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

    const key = useMemo(() => getKey(activityReportId, day), []);
    const { endDrag } = useTimesheetSelectionApi(key);

    const rootCls = "cell";

    const onPointerUp: PointerEventHandler<HTMLDivElement> = (ev) => {
      if (hasClass(ev, rootCls)) endDrag(key);
    };

    const onPointerCancel: PointerEventHandler<HTMLDivElement> = (ev) => {
      if (hasClass(ev, rootCls)) endDrag(key);
    };

    const onPointerCancelCapture: PointerEventHandler<HTMLDivElement> = (
      ev
    ) => {
      if (hasClass(ev, rootCls)) endDrag(key);
    };

    return (
      <td
        onPointerCancelCapture={onPointerCancelCapture}
        onPointerCancel={onPointerCancel}
        onPointerUp={onPointerUp}
        className={className}
      >
        <Component />
      </td>
    );
  };
