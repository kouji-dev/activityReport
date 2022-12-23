import { sheetTotalSelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { FC } from "react";
import { useSelector } from "react-redux";

interface Props {}

export const TimesheetTotal: FC<Props> = () => {
  const total = useSelector(sheetTotalSelector);
  return <div className="tf total">{total}</div>;
};
