import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { dayTotalSelector } from '../../activity-report-sheet.selectors';
import { HeadCol } from '../head/timesheet-head.component';

interface Props extends HeadCol {}

export const TimesheetColumnTotal: FC<Props> = (props) => {
  const { day } = props;
  const total = useSelector(dayTotalSelector(day));
  return <td>{total}</td>;
};
