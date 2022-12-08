import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { Id } from "../../utils/types";
import { activityReportIdsSelector } from "../store/selectors/activity-report-sheet.selectors";
import { TimesheetRow } from "./row/timesheet-row.component";
import { TimesheetSelectionProvider } from "./row/selection/context/timesheet-selection.context";

interface Props {}

export const TimesheetBody: FC<Props> = (props) => {
  const activityReports = useSelector<IRootState, Id[]>(
    activityReportIdsSelector
  );

  return (
    <tbody>
      {activityReports.map((activityReportId) => (
          <TimesheetRow
            key={activityReportId}
            activityReportId={activityReportId}
          />
        ))}
    </tbody>
  );
};
