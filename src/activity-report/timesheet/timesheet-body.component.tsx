import { FC } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "store";
import { Id } from "utils/types";
import { activityReportIdsSelector } from "../store/selectors/activity-report-sheet.selectors";
import { TimesheetRow } from "./row/timesheet-row.component";
import { FixedSizeList, ListChildComponentProps } from "react-window";

const VirtualRow = (props: ListChildComponentProps) => {
  const { data, index, style } = props;
  const activityReportId = data[index];
  return <TimesheetRow style={style} activityReportId={activityReportId} />;
};

interface Props {}

export const TimesheetBody: FC<Props> = (props) => {
  const activityReports = useSelector<IRootState, Id[]>(
    activityReportIdsSelector
  );

  return (
    <FixedSizeList
      className="tbody"
      height={500}
      width="100%"
      itemSize={35}
      itemData={activityReports}
      itemCount={activityReports.length}
      overscanCount={4}
    >
      {VirtualRow}
    </FixedSizeList>
  );
};
