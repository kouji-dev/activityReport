import { FC, Fragment, memo } from "react";
import cls from "classnames";
import {
  CancelablePointerProps,
  WithCancalablePointer,
} from "@shared/components/cancelable-pointer-events.hoc";

const CellPointerListener = WithCancalablePointer(() => <Fragment />);

interface Props extends CancelablePointerProps {}

export const EmptyCell: FC<Props> = memo((props) => {
  const className = cls("cell", "cell-empty");
  return <CellPointerListener {...props} className={className} />;
});

EmptyCell.displayName = "EmptyCell";
