import { FC, memo } from "react";
import cls from "classnames";
import {
  CancelableSelectionPointerProps,
  WithCancelableSelectionPointer,
} from "report/shared/components/cancelable-selection-pointer-events.hoc";
import { CellSelectionLayer } from "./layers/cell-selection-layer.component";

const CellPointerListener = WithCancelableSelectionPointer(
  ({ reportId, day }: CancelableSelectionPointerProps) => (
    <CellSelectionLayer
      reportId={reportId}
      day={day}
    />
  )
);

interface Props extends CancelableSelectionPointerProps {}

export const EmptyCell: FC<Props> = memo((props) => {
  const className = cls("td", "cell-empty");
  return <CellPointerListener {...props} className={className} />;
});

EmptyCell.displayName = "EmptyCell";
