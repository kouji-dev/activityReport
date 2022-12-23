import { ColumnTotal } from "./column-total.component";
import { HeadCol } from "../head/head.component";
import { Total } from "./total.component";
import { useSheetColumns } from "utils/date-utils";

export const Footer = () => {
  const columns = useSheetColumns();

  return (
    <div className="tfoot">
      <div className="tf">Total</div>
      {columns.map((col: HeadCol, key) => (
        <ColumnTotal key={key} {...col} />
      ))}
      <Total />
    </div>
  );
};
