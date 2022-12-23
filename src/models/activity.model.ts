import { faker } from "@faker-js/faker";
import moment from "moment";
import { SheetCellStatus } from "../report/table/common-types";
import { isHoliday, isWeekend, toServerFormat } from "../utils/date-utils";
import {memoize} from "lodash";

export interface IActivity {
  id?: string;
  date?: string;
  morning?: boolean;
  afternoon?: boolean;
  validationDate?: Date;
  validationStatus?: SheetCellStatus;
  reportId?: number;
  validatorId?: number;
}

export const isActivityApproved = (activity: IActivity) =>
  activity?.validationStatus === "APPROVED";

export const isActivityPending = (activity: IActivity) =>
  activity?.validationStatus === "PENDING";

export const isActivityRejected = (activity: IActivity) =>
  activity?.validationStatus === "REJECTED";

export type IStandardActivityMap = Record<number, IActivity[]>;

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

const fakeActivity = (reportId: number): IActivity => {
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
      "APPROVED",
      "REJECTED",
      "PENDING",
    ]) as SheetCellStatus,
    reportId,
  };
};

export const fakeActivities = memoize(
  (reportId: number, times = 10): IActivity[] => {
    return [...Array(times).keys()].map(() =>
      fakeActivity(reportId)
    );
  }
);
