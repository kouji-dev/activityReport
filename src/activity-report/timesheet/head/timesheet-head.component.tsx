import { Moment } from 'moment';
import React, { FC, memo, useEffect, useState } from 'react';
import { useSheetColumns } from '../../../utils/date-utils';
import { Th, ThProject } from './timesheet-th.component';

interface Props {}

export interface HeadCol {
  date: Moment;
  day: string;
  isWeekend?: boolean;
  isHoliday?: boolean;
  isDisabled?: boolean;
}

export type HeadCols = HeadCol[];

export const TimesheetHead: FC<Props> = memo((props) => {
  const columns = useSheetColumns();

  return (
    <thead>
      <tr>
        <ThProject />
        {columns.map((col: HeadCol, key) => (
          <Th key={key} {...col} />
        ))}
      </tr>
    </thead>
  );
});
