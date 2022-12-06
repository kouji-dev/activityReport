import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { SelectRangeOfDaysPayload } from './activity-report-sheet.actions';
import { ActivityReportActions } from './activity-report-sheet.state';

//  ********    day1    day2    day3    day4    day5    day6
//  project1             x                       x       /x
//  project2     x               x       x               x/

// key of each cell is projectId/day

// we should store only existing cells

type OnEventAction<P> = (payload?: P) => void;
type OnPayloadlessEventAction = OnEventAction<undefined>;

type ActivityReportSheetAPI = {
  onSelectHalfDay: OnEventAction<SelectRangeOfDaysPayload>;
  onApproveReport: OnPayloadlessEventAction;
};

const ActivityReportSheetContext = createContext(null);

export const useActivityReportSheet = () => {
  // make default value of context undefined and throw when it is the case, otherwise it might cause some unncessary re-renders
  const ctx = useContext(ActivityReportSheetContext);

  if (!ctx)
    throw new Error(
      'ActivityReportSheetContext is null, please wrap your component with `ActivityReportSheetProvider`'
    );
  return ctx;
};

const useActivityReportSheetActions = () => {
  const dispatch = useDispatch();

  const onSelectHalfDay = useCallback(
    (payload: SelectRangeOfDaysPayload) => {
      dispatch(ActivityReportActions.selectRangeOfDays(payload));
    },
    [dispatch]
  );

  const onApproveReport = useCallback(() => {
    dispatch(ActivityReportActions.approveReport());
  }, [dispatch]);

  const api = useMemo(
    () => ({
      onSelectHalfDay,
      onApproveReport,
    }),
    [dispatch]
  );

  return {
    api,
  };
};

export const ActivityReportSheetProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const ctx = useActivityReportSheetActions();

  return (
    <ActivityReportSheetContext.Provider value={ctx}>
      {children}
    </ActivityReportSheetContext.Provider>
  );
};
