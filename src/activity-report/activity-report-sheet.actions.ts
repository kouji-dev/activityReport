import { Action, ActionCreator } from '../utils/store-utils';

// Payloads
export type SelectRangeOfDaysPayload = {
  rowId: number;
  from: string;
  to?: string;
};

// Actions
type SelectRangeOfDaysAction = Action<
  'selectRangeOfDays',
  SelectRangeOfDaysPayload
>;
type ApproveReportAction = Action<'approveReport'>;

export type ActivityReportSheetActions =
  | SelectRangeOfDaysAction
  | ApproveReportAction;

//Action Creators
export const selectRangeOfDays: ActionCreator<
  SelectRangeOfDaysAction,
  SelectRangeOfDaysPayload
> = (payload) => ({
  type: 'selectRangeOfDays',
  payload,
});
export const approveReport: ActionCreator<ApproveReportAction> = () => ({
  type: 'approveReport',
});
