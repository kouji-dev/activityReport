import { Selection } from "report/table/common-types";
import { fromServerFormat, getSheetColumns } from "utils/date-utils";
import { createAsyncThunk } from "utils/store-utils";
import { Id } from "utils/types";
import {
  ApproveActivitiesPayload,
  ApproveAllPayload,
  RejectActivitiesPayload,
  RejectAllPayload,
  RemoveActivitiesPayload,
  ToggleActivitiesStatusPayload,
} from "../actions/report.actions";
import { ReportSelectionActions } from "../report-selection.state";
import { ReportActions } from "../report.state";

const namespace = "report";

export const submitReportsThunk = createAsyncThunk(
  `${namespace}/submit`,
  async (selection: Selection, { dispatch }) => {
    const keys = await new Promise<any>((resolve) => {
      const mapped: Record<string, Id[]> = {};
      for (const reportId of Object.keys(selection)) {
        for (const day of selection[reportId].values()) {
          if (!mapped[reportId]) mapped[reportId] = [];
          mapped[reportId].push(day);
        }
      }
      resolve(mapped);
    });
    await dispatch(declareSelectionThunk(keys));
    dispatch(ReportSelectionActions.deselectAll());
  }
);

export const declareAllThunk = createAsyncThunk(
  `${namespace}/declareAll`,
  async (reportId: Id, { getState, dispatch }) => {
    const keys = await new Promise<any>((resolve) => {
      const date = getState().report.month;
      const holidays = getState().holidays;
      const columns = getSheetColumns(fromServerFormat(date), holidays);
      const keys: Selection = {
        [reportId]: new Set<Id>(),
      };
      for (const col of columns) {
        (keys[reportId] as Set<Id>).add(col.day);
      }
      resolve(keys);
    });
    await dispatch(declareSelectionThunk(keys));
    dispatch(ReportSelectionActions.deselectAll());
  }
);

type DeclareSelectionThunkReturn = Selection;
type DeclareSelectionThunkPayload = Selection;
export const declareSelectionThunk = createAsyncThunk<
  DeclareSelectionThunkReturn,
  DeclareSelectionThunkPayload
>(`${namespace}/declareSelectionThunk`, async (keys: Selection) => {
  return Promise.resolve(keys);
});

export const undeclareAllThunk = createAsyncThunk(
  `${namespace}/undeclareAllThunk`,
  async (reportId: Id, { dispatch }) => {
    dispatch(ReportSelectionActions.deselectAll());
    return reportId;
  }
);

type RemoveActivitiesThunkReturn = void;
type RemoveActivitiesThunkPayload = Selection;
export const removeActivitiesThunk = createAsyncThunk<
  RemoveActivitiesThunkReturn,
  RemoveActivitiesThunkPayload
>(`${namespace}/removeActivitiesThunk`, async (payload, { dispatch }) => {
  const removeActivitiesPayload: RemoveActivitiesPayload = {
    ...payload,
  };
  dispatch(ReportActions.removeActivities(removeActivitiesPayload));
});

type ApproveActivitiesThunkReturn = void;
type ApproveActivitiesThunkPayload = Selection;
export const approveActivitiesThunk = createAsyncThunk<
  ApproveActivitiesThunkReturn,
  ApproveActivitiesThunkPayload
>(`${namespace}/approveActivitiesThunk`, async (payload, { dispatch }) => {
  const approveActivitiesPayload: ApproveActivitiesPayload = payload;
  console.log({ payload });
  dispatch(ReportActions.approveActivities(approveActivitiesPayload));
});

type RejectActivitiesThunkReturn = void;
type RejectActivitiesThunkPayload = Selection;
export const rejectActivitiesThunk = createAsyncThunk<
  RejectActivitiesThunkReturn,
  RejectActivitiesThunkPayload
>(`${namespace}/rejectActivitiesThunk`, async (payload, { dispatch }) => {
  const rejectActivitiesPayload: RejectActivitiesPayload = payload;
  dispatch(ReportActions.rejectActivities(rejectActivitiesPayload));
});

type ToggleActivitiesStatusThunkReturn = void;
type ToggleActivitiesStatusThunkPayload = Selection;
export const toggleActivitiesStatusThunk = createAsyncThunk<
  ToggleActivitiesStatusThunkReturn,
  ToggleActivitiesStatusThunkPayload
>(`${namespace}/toggleActivitiesStatusThunk`, async (payload, { dispatch }) => {
  const toggleActivitiesStatusPayload: ToggleActivitiesStatusPayload = payload;
  dispatch(
    ReportActions.toggleActivitiesStatus(toggleActivitiesStatusPayload)
  );
});

type ApproveAllThunkReturn = void;
type ApproveAllThunkPayload = Id;
export const approveAllThunk = createAsyncThunk<
  ApproveAllThunkReturn,
  ApproveAllThunkPayload
>(`${namespace}/approveAllThunk`, async (payload, { dispatch }) => {
  const approveAllPayload: ApproveAllPayload = payload;
  dispatch(ReportActions.approveAll(approveAllPayload));
});

type RejectAllThunkReturn = void;
type RejectAllThunkPayload = Id;
export const rejectAllThunk = createAsyncThunk<
  RejectAllThunkReturn,
  RejectAllThunkPayload
>(`${namespace}/rejectAllThunk`, async (payload, { dispatch }) => {
  const rejectAllPayload: RejectAllPayload = payload;
  dispatch(ReportActions.rejectAll(rejectAllPayload));
});
