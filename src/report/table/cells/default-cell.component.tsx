import { FC, memo } from "react";
import cls from "classnames";
import { useSelector } from "react-redux";
import { EmptyCell } from "./empty-cell.component";
import { CellSelectionLayer } from "./layers/cell-selection-layer.component";
import {
  CancelableSelectionPointerProps,
  WithCancelableSelectionPointer,
} from "report/shared/components/cancelable-selection-pointer-events.hoc";
import { CellContentLayer } from "./layers/cell-content-layer.component";
import { DisabledCell } from "./disabled-cell.component";
import {hasActivitySelector, isDisabledActivitySelector} from "@store/selectors/report.selectors";

const CellPointerListener = WithCancelableSelectionPointer(
  ({ reportId, day }: CancelableSelectionPointerProps) => (
    <>
      <CellContentLayer reportId={reportId} day={day} />
      <CellSelectionLayer
        reportId={reportId}
        day={day}
      />
    </>
  )
);

interface Props extends CancelableSelectionPointerProps {}

export const DefaultCell: FC<Props> = memo((props) => {
  const { reportId, day } = props;
  const className = cls("td");
  const hasCell = useSelector(hasActivitySelector(reportId, day));
  const isDisabled = useSelector(
    isDisabledActivitySelector(reportId, day)
  );

  if (isDisabled) {
    return <DisabledCell reportId={reportId} day={day} />;
  }

  if (!hasCell)
    return <EmptyCell reportId={reportId} day={day} />;

  return <CellPointerListener {...props} className={className} />;
});

DefaultCell.displayName = "DefaultCell";
