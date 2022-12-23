import { FC } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "store";
import { Id } from "utils/types";
import { Row } from "./row/row.component";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import {reportIdsSelector} from "@store/selectors/report.selectors";

const VirtualRow = (props: ListChildComponentProps) => {
  const { data, index, style } = props;
  const reportId = data[index];
  return <Row style={style} reportId={reportId} />;
};

const ITEM_SIZE = 35;

interface Props {}

export const Body: FC<Props> = (props) => {
  const activityReports = useSelector<IRootState, Id[]>(
    reportIdsSelector
  );

  return (
    <FixedSizeList
      className="tbody"
      height={500}
      width={ITEM_SIZE * (31 + 5 + 1)}
      itemSize={ITEM_SIZE}
      itemData={activityReports}
      itemCount={activityReports.length}
      overscanCount={4}
    >
      {VirtualRow}
    </FixedSizeList>
  );
};
