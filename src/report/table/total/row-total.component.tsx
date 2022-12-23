import { reportTotalSelector } from "report/store/selectors/report.selectors";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Id } from "utils/types";

interface Props {
  reportId: Id;
}

export const RowTotal: FC<Props> = (props) => {
  const { reportId } = props;
  const total = useSelector(reportTotalSelector(reportId));
  return <div className="td total-row">{total}</div>;
};
