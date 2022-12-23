import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { Id } from "utils/types";
import {cellTotalSelector} from "@store/selectors/report.selectors";

interface Props {
  reportId: Id;
  day: string;
}

export const CellContentLayer: FC<Props> = memo((props) => {
  const { reportId, day } = props;
  const total = useSelector(cellTotalSelector(reportId, day));
  const rootCls = "cell-content";
  return <div className={rootCls}>{total}</div>;
});
