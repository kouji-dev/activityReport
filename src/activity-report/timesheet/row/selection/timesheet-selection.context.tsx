import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  FC,
  PropsWithChildren,
  useMemo,
  useRef,
} from 'react';
import { Id } from '../../../../utils/types';

type TimesheetSelectionData = {
  dragging: boolean;
  selection: { [key: string]: any };
  range: Set<string>;
};

type TimesheetSelectionApi = {
  select: (activityReportId: Id, day: string) => void;
  startDrag: (key: string) => void;
  endDrag: (key: string) => void;
  onMove: (key: string) => void;
};

type TimesheetSelectionContext = {
  api: TimesheetSelectionApi;
  data: TimesheetSelectionData;
};

type Range = {
  start?: string;
  end?: string;
};

const TimesheetSelectionDataContext =
  createContext<TimesheetSelectionData>(null);

const TimesheetSelectionActionsContext =
  createContext<TimesheetSelectionApi>(null);

const useTimesheetSelectionContext: () => TimesheetSelectionContext = () => {
  const [selection, setSelection] = useState({});
  const [dragging, setDragging] = useState(false);
  // const range = useRef<Range>({});
  const [range, setRange] = useState<Set<string>>(new Set());

  const select = useCallback((activityReportId: Id, day: string) => {}, []);
  const startDrag = useCallback((key: string) => {
    setDragging(true);
    // range.current = {
    //   start: day,
    // };
    addKey(key);
  }, []);

  const endDrag = useCallback((key: string) => {
    setDragging(false);
    // range.current.end = day;
    addKey(key);
  }, []);

  const addKey = useCallback((key: string) => {
    setRange((r) => new Set([...r, key]));
  }, []);

  const onMove = useCallback(
    (key: string) => {
      if (dragging && !range.has(key)) {
        addKey(key);
      }
    },
    [dragging]
  );

  const api = useMemo(
    () => ({ select, startDrag, endDrag, onMove }),
    [select, startDrag, endDrag, onMove]
  );

  const data = useMemo(
    () => ({ dragging, selection: {}, range }),
    [dragging, range]
  );

  return {
    data,
    api,
  };
};

export const TimesheetSelectionProvider: FC<PropsWithChildren<{}>> = (
  props
) => {
  const { children } = props;
  const { data, api } = useTimesheetSelectionContext();
  return (
    <TimesheetSelectionActionsContext.Provider value={api}>
      <TimesheetSelectionDataContext.Provider value={data}>
        {children}
      </TimesheetSelectionDataContext.Provider>
    </TimesheetSelectionActionsContext.Provider>
  );
};

export const useTimesheetSelectionData: (
  activityReportId: Id,
  day: string
) => TimesheetSelectionData = (activityReportId: Id, day: string) => {
  const data = useContext(TimesheetSelectionDataContext);

  if (!data)
    console.log(
      `TimesheetSelectionDataContext is available only under parent TimesheetBody`
    );

  return data;
};

export const useTimesheetSelectionActions: (
  activityReportId: Id,
  day: string
) => TimesheetSelectionApi = (activityReportId: Id, day: string) => {
  const api = useContext(TimesheetSelectionActionsContext);

  if (!api)
    console.log(
      `TimesheetSelectionActionsContext is available only under parent TimesheetBody`
    );

  return api;
};
