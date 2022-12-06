import React from 'react';
import { useSheetColumns } from '../../../utils/date-utils';
import { TimesheetColumnTotal } from './timesheet-column-total.component';
import { HeadCol } from '../head/timesheet-head.component';
import { TimesheetTotal } from './timesheet-total.component';

export const TimesheetFooterTotal = () => {
  const columns = useSheetColumns();

  return (
    <tfoot>
      <tr>
        <td></td>
        {columns.map((col: HeadCol, key) => (
          <TimesheetColumnTotal key={key} {...col} />
        ))}
        <TimesheetTotal />
      </tr>
    </tfoot>
  );
};
