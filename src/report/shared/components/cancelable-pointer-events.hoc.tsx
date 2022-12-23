import { FC, PointerEventHandler, PropsWithChildren } from "react";

export interface CancelablePointerProps {
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
  onPointerCancel: PointerEventHandler<HTMLDivElement>;
  onPointerCancelCapture: PointerEventHandler<HTMLDivElement>;
  className?: string;
}

export const CancelablePointer: FC<
  PropsWithChildren<CancelablePointerProps>
> = (props) => {
  return <div {...props}>{props.children}</div>;
};
