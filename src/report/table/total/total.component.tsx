import { sheetTotalSelector } from "report/store/selectors/report.selectors";
import { FC } from "react";
import { useSelector } from "react-redux";

interface Props {}

export const Total: FC<Props> = () => {
  const total = useSelector(sheetTotalSelector);
  return <div className="tf total">{total}</div>;
};
