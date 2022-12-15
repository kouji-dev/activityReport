import { activityReportMonthSelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { HeadCols } from "activity-report/timesheet/head/timesheet-head.component";
import moment, { Moment } from "moment";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { holidaysSelectors } from "../holidays/holidays.selectors";

export type Month = moment.Moment;

export const isWeekend = (date: Moment) => {
  const weekDays = [6, 7];
  return weekDays.some((isoDay) => date.isoWeekday() === isoDay);
};

export const isHoliday = (date: Moment) => {
  const holidays = [6, 7];
  return holidays.some((isoDay) => date.date() === isoDay);
};

export const toServerFormat = (date: Moment) => {
  return date.format();
};

export const fromServerFormat = (date: any) => {
  return moment(date);
};

const baseDate = moment();
export const getRandomDate = (month, year) => {
  const date = baseDate;
  const daysOfMonth = date.date();
  const day = Math.floor(Math.random() * daysOfMonth);

  const result = date.month(month).year(year).date(day);

  return toServerFormat(result);
};

export const useSheetColumns = () => {
  const reportMonth = useSelector(activityReportMonthSelector);
  const date = fromServerFormat(reportMonth);
  const holidays: Array<number> = useSelector(holidaysSelectors);
  const month = date.month();
  const year = date.year();

  const columns: HeadCols = useMemo(() => {
    return getSheetColumns(date, holidays);
  }, [month, year, holidays]);

  return columns;
};

export const getSheetColumns = (date: Moment, holidays: number[]) => {
  const holidaysSet = new Set(holidays);
  const startOfMonth = date.clone().startOf("month");
  const endOfMonth = date.clone().endOf("month");

  const cols: HeadCols = [];
  while (startOfMonth.isSameOrBefore(endOfMonth)) {
    cols.push({
      date: startOfMonth.clone(),
      day: toServerFormat(startOfMonth),
      isWeekend: isWeekend(startOfMonth),
      isHoliday: holidaysSet.has(startOfMonth.date()),
      isDisabled: false,
    });
    startOfMonth.add(1, "d");
  }
  return cols;
};
