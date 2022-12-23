import { CSSProperties, FC } from "react";
import { CellToolbox } from "./toolbox/cell-toolbox.component";
import { useSheetColumns } from "utils/date-utils";
import { Id } from "utils/types";
import {Cell} from "./cell.component";
import {RowTotal} from "../total/row-total.component";
import {RowContext} from "./row-context.component";

interface Props {
  reportId: Id;
  style?: CSSProperties;
}

export const Row: FC<Props> = (props) => {
  const { reportId, style } = props;
  const columns = useSheetColumns();
  return (
    <div className="tr" style={style}>
      <RowContext reportId={reportId} />
      <CellToolbox reportId={reportId} />
      {columns.map((col) => (
        <Cell
          key={`${col.day}-${reportId}`}
          {...col}
          reportId={reportId}
        />
      ))}
      <RowTotal reportId={reportId} />
    </div>
  );
};
