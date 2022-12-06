import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { Id } from '../../utils/types';
import { activityReportIdsSelector } from '../activity-report-sheet.selectors';
import { TimesheetRow } from './row/timesheet-row.component';
import { TimesheetSelectionProvider } from './row/selection/timesheet-selection.context';

interface Props {}

export const TimesheetBody: FC<Props> = (props) => {
  const activityReports = useSelector<IRootState, Id[]>(
    activityReportIdsSelector
  );

  return (
    <tbody>
      <TimesheetSelectionProvider>
        {activityReports.map((activityReportId) => (
          <TimesheetRow
            key={activityReportId}
            activityReportId={activityReportId}
          />
        ))}
      </TimesheetSelectionProvider>
    </tbody>
  );
};
