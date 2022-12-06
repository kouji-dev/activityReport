import React, { FC, useEffect } from 'react';
import { useProject } from '../../project/useProject';
import { TimesheetBody } from './timesheet-body.component';
import { TimesheetFooterTotal } from './total/timesheet-footer-total.component';
import { TimesheetHead } from './head/timesheet-head.component';

interface Props {}

export const Timesheet: FC<Props> = () => {
  const {
    api: { loadData },
  } = useProject();

  useEffect(() => {
    loadData();
  }, []);

  return (
    <table>
      <TimesheetHead />
      <TimesheetBody />
      <TimesheetFooterTotal />
    </table>
  );
};
