import { Range } from "activity-report/timesheet/common-types";
import { fromServerFormat, toServerFormat } from "./date-utils";
import { Id } from "./types";

export const getKey = (activityReportId: Id, day: string) =>
  `${activityReportId}-${day}`;

export const generateRangeKeys = (activityReportId: Id, range: Range) => {
  console.log(activityReportId, range);
  if (!(range && range.length)) return [];
  const keys = [];

  const [{ date: startDateString }, { date: endDateString }] = range;

  const startDate = fromServerFormat(startDateString),
    endDate = fromServerFormat(endDateString);

  const tempDate = startDate.clone();

  while (tempDate.isBetween(startDateString, endDateString)) {
    keys.push(getKey(activityReportId, toServerFormat(tempDate)));
    tempDate.add(1, "days");
  }

  console.log(keys);

  return keys;
};
