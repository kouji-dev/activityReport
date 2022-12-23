import { IActivityReport } from "models/activity-report.model";
import { IStandardActivity } from "models/standard-activity.model";
import { Id } from "utils/types";
import { HeadCols } from "./head/timesheet-head.component";

export type HalfDay = {
  is: boolean;
  selected?: boolean;
  disabled?: boolean;
  editable?: boolean;
  comment?: string;
} | null;

export const getDefaultHalfDay: (is: boolean) => HalfDay = (is: boolean) => ({
  is,
  selected: false,
  disabled: false,
  editable: true,
});
export enum SheetCellStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
export enum SheetMode {
  EDITTING = "EDITTING",
  VALIDATING = "VALIDATING",
  READ_ONLY = "READ_ONLY",
}

export const modes: SheetMode[] = [
  SheetMode.EDITTING,
  SheetMode.VALIDATING,
  SheetMode.READ_ONLY,
];

export type SheetCell<T> = {
  date: string;
  morning?: HalfDay;
  afternoon?: HalfDay;
  isWeekend?: boolean;
  isHoliday?: boolean;
  status: SheetCellStatus;
  meta?: T;
};

export enum SheetStatus {
  PENDING = "PENDING",
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
}

export type Cells<T> = Record<Id, SheetCell<T>>;

// Each Activity has many Cells
export type SheetRow<P, T> = {
  ids: Id[];
  entities: Cells<T>;
  meta: P;
};

export type SheetRows<P, T> = Record<Id, SheetRow<P, T>>;

export type SheetRowsRecords = Record<
  Id,
  SheetRow<IActivityReport, IStandardActivity>
>;

// Each Activity Report has many Activities
export type SheetData<P, T> = {
  ids: Id[];
  entities: SheetRows<P, T>;
  month: string | null;
  columns: HeadCols;
  editable?: boolean;
  mode: SheetMode;
};

export type CellIdentifier = {
  day: string;
  activityReportId: Id;
};

export type RowKey = Id;

export type RowCellIdentifiers = {
  rowKey: RowKey;
} & CellIdentifier;

export type RangeItem = string;

export type Range = [] | [RangeItem, RangeItem];
export type RangeDirection = "increasing" | "decreasing";

export type UpdateOrRemovePayload = {
  upsert: Record<string, string[]>;
  remove: Record<string, string[]>;
};

export type Selection = Record<Id, Set<Id> & Array<Id>>;
