import { Moment } from "moment";
import { FC, memo } from "react";
import { useSheetColumns } from "utils/date-utils";
import { Th } from "./th.component";
import {HeadToolbox} from "./toolbox/head-toolbox.component";
import {HeadCorner} from "./head-corner.component";

interface Props {}

export interface HeadCol {
  date: Moment;
  day: string;
  isWeekend?: boolean;
  isHoliday?: boolean;
}

export type HeadCols = HeadCol[];

export const Head: FC<Props> = memo((props) => {
  const columns = useSheetColumns();

  return (
    <div className="thead">
      <HeadCorner />
      {columns.map((col: HeadCol, key) => (
        <Th key={key} {...col} />
      ))}
      <HeadToolbox />
    </div>
  );
});
