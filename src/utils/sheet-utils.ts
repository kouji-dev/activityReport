import { Range } from "activity-report/timesheet/common-types";
import { fromServerFormat, toServerFormat } from "./date-utils";
import { Id } from "./types";

export const getKey = (activityReportId: Id, day: string) =>
  `${activityReportId}||${day}`;

export const generateRangeKeys = (activityReportId: Id, range: Range) => {
  if (!(range && range.length)) return [];
  const keys = [];

  const [startDateString, endDateString] = range;

  const startDate = fromServerFormat(startDateString);

  const tempDate = startDate.clone();

  while (tempDate.isBetween(startDateString, endDateString, "date", "[]")) {
    keys.push(getKey(activityReportId, toServerFormat(tempDate)));
    tempDate.add(1, "days");
  }

  return keys;
};
