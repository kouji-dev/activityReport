import React, { FC, memo, useMemo } from 'react';
import { Id } from '../../../../utils/types';
import { useTimesheetSelectionData } from './timesheet-selection.context';
import cls from 'classnames';
import { getKey } from '../../../../utils/sheet-utils';

interface Props {
  activityReportId: Id;
  day: string;
}

export const TimesheetCellSelectionLayer: FC<Props> = memo((props) => {
  const { activityReportId, day } = props;
  const { range, dragging } = useTimesheetSelectionData(activityReportId, day);

  const key = useMemo(() => getKey(activityReportId, day), []);

  const rootCls = 'cell-selection-layer';
  const className = cls(rootCls, {
    'cell-selected': range.has(key),
    'cell-dragging': dragging,
  });

  return <div className={className} />;
});
