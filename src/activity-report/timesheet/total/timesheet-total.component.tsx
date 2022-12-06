import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { sheetTotalSelector } from '../../activity-report-sheet.selectors';

interface Props {}

export const TimesheetTotal: FC<Props> = () => {
  const total = useSelector(sheetTotalSelector);
  return <td>{total}</td>;
};
