import { Id } from "../../utils/types";
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
  EDITTING,
  VALIDATING,
  READ_ONLY,
}

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

// Each Activity Report has many Activities
export type SheetData<P, T> = {
  ids: Id[];
  entities: SheetRows<P, T>;
  month: string;
  columns: HeadCols;
  editable?: boolean;
  mode: SheetMode;
};

export type CellIdentifier = {
  day: string;
  activityReportId: Id;
} & { key: string };

export type RowKey = Id;

export type RowCellIdentifiers = {
  rowKey: RowKey;
} & CellIdentifier;
