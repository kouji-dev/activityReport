import { Range } from "report/table/common-types";
import moment from "moment";
import { fromServerFormat, toServerFormat } from "./date-utils";
import { Id } from "./types";

export const getKey = (reportId: Id, day: string) =>
  `${reportId}||${day}`;

export const fromKey: (key: string) => { reportId: Id; day: string } = (
  key: string
) => {
  const [reportId, day] = key.split("||");
  return { reportId, day };
};

export const generateRangeKeys = (
  range: Range,
  existingCells: Id[],
  useCellsOnly?: boolean
) => {
  return useCellsOnly
    ? generateKeysWithinRangeWithConstraint(range, existingCells)
    : generateKeysWithinRange(range);
};

const generateKeysWithinRange = (range: Range) => {
  if (!(range && range.length)) return [];
  const keys: string[] = [];

  const sortedRange = [...range].sort((a, b) => moment(a).diff(b));

  const [startDateString, endDateString] = sortedRange;

  const startDate = fromServerFormat(startDateString);

  const currentDate = startDate.clone();

  while (currentDate.isBetween(startDateString, endDateString, "date", "[]")) {
    const currentStringDate = toServerFormat(currentDate);
    keys.push(currentStringDate);
    currentDate.add(1, "days");
  }

  return keys;
};

const generateKeysWithinRangeWithConstraint = (
  range: Range,
  existingCells: Id[]
) => {
  if (!(range && range.length) || existingCells.length == 0) return [];
  const keys: string[] = [];

  const sortedRange = [...range].sort((a, b) => moment(a).diff(b));

  const [startDateString, endDateString] = sortedRange;

  for (const day of existingCells) {
    if (
      fromServerFormat(day).isBetween(
        startDateString,
        endDateString,
        "date",
        "[]"
      )
    ) {
      keys.push(day as string);
    }
  }

  return keys;
};
