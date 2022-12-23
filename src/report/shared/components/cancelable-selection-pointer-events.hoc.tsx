import { RowCellIdentifiers } from "report/table/common-types";
import { FC, PointerEventHandler, useMemo } from "react";
import { hasClass } from "utils/classname-utils";
import { getKey } from "utils/sheet-utils";
import { Id } from "utils/types";
import { CancelablePointer } from "./cancelable-pointer-events.hoc";
import {useSelectionApi} from "@hooks/use-selection-api.hook";

export interface CancelableSelectionPointerProps {
  reportId: Id;
  day: string;
  className?: string;
}

export const WithCancelableSelectionPointer =
  <T extends CancelableSelectionPointerProps>(Component: FC<T>) =>
  (props: T) => {
    const { reportId, day, className } = props;

    const payload: RowCellIdentifiers = useMemo(
      () => ({
        key: getKey(reportId, day),
        rowKey: reportId,
        day,
        reportId,
      }),
      []
    );
    const { startDrag, onSelecting, endDrag, isHoldingCtrl } =
      useSelectionApi(payload);

    const rootCls = "selection-layer";

    const handleCtrl = (ev: any) => {
        isHoldingCtrl(ev.ctrlKey);
    };

    const onPointerDown: PointerEventHandler<HTMLDivElement> = (ev) => {
      console.log(ev);
      handleCtrl(ev);
      if (hasClass(ev, rootCls)) {
        startDrag();
      }
    };

    const onPointerMove: PointerEventHandler<HTMLDivElement> = (ev) => {
      if (!hasClass(ev, rootCls)) return;
      onSelecting(ev.ctrlKey);
    };

    const resetCtrl = () => isHoldingCtrl(false);
    const onCancel = (ev: any) => {
      if (hasClass(ev, rootCls)) {
        endDrag();
        resetCtrl();
      }
    };

    const onPointerUp: PointerEventHandler<HTMLDivElement> = (ev) => {
      console.log(ev);
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
      <CancelablePointer
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerCancelCapture={onPointerCancelCapture}
        onPointerCancel={onPointerCancel}
        onPointerUp={onPointerUp}
        className={className}
      >
        <Component {...props} />
      </CancelablePointer>
    );
  };
