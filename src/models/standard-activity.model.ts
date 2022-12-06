import { faker } from '@faker-js/faker';
import moment = require('moment');
import { SheetCellStatus } from '../activity-report/timesheet/common-types';
import memoize from 'lodash.memoize';
import { isHoliday, isWeekend, toServerFormat } from '../utils/date-utils';

export interface IStandardActivity {
  id?: string;
  date?: string;
  morning?: boolean;
  afternoon?: boolean;
  validationDate?: Date;
  validationStatus?: SheetCellStatus;
  activityReportId?: number;
  validatorId?: number;
}

export const isActivityApproved = (activity: IStandardActivity) =>
  activity?.validationStatus === 'APPROVED';

export const isActivityPending = (activity: IStandardActivity) =>
  activity?.validationStatus === 'PENDING';

export const isActivityRejected = (activity: IStandardActivity) =>
  activity?.validationStatus === 'REJECTED';

export type IStandardActivityMap = Record<number, IStandardActivity[]>;

const min = moment().month(11).day(1).valueOf();
const max = moment().month(11).day(30).valueOf();

const getDays = () => {
  const days = [];
  let day = 1;
  const date = moment();
  // const t0 = performance.now();
  while (day <= 31) {
    date.date(day);
    if (!(isWeekend(date) || isHoliday(date))) {
      days.push(day++);
      continue;
    }
    day++;
  }
  // const t1 = performance.now();
  // console.log(`time: ${t1 - t0}`);
  return days;
};

const randomDay = () => {
  let days = getDays();

  return () => {
    const l = days.length - 1;
    const i = Math.floor(Math.random() * l);
    const day = days[i];
    days.splice(i, 1);
    return day;
  };
};

let getNextDay = randomDay();

const baseDate = moment();

const _fakeStandardActivity = (activityReportId: number): IStandardActivity => {
  const clone = new Date(min);
  const onMinus = clone.setDate(clone.getDate() - faker.datatype.number());
  const onPlus = clone.setDate(clone.getDate() + faker.datatype.number());

  const morning = faker.datatype.boolean();
  const afternoon = faker.datatype.boolean();

  let nextDay = getNextDay();

  if (!nextDay) {
    getNextDay = randomDay();
    nextDay = getNextDay();
  }

  const date = toServerFormat(baseDate.date(nextDay));

  return {
    id: faker.datatype.uuid(),
    date,
    morning,
    afternoon,
    validationDate: faker.date.between(onMinus, onPlus),
    validationStatus: faker.helpers.arrayElement([
      'APPROVED',
      'REJECTED',
      'PENDING',
    ]) as SheetCellStatus,
    activityReportId,
  };
};

export const fakeStandardActivity = memoize(
  (activityReportId: number, times = 10): IStandardActivity[] => {
    return [...Array(times).keys()].map(() =>
      _fakeStandardActivity(activityReportId)
    );
  }
);
