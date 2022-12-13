import { createAsyncThunk as cat } from "@reduxjs/toolkit";
import { isEqual } from "lodash";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { IRootState, UseDispatch } from "store";

export type Action<T extends string, P extends unknown = unknown> = {
  type: T;
  payload?: P;
};

export type ActionCreator<A, P = unknown> = (payload?: P) => A;

export const createSelector = createSelectorCreator(defaultMemoize, isEqual);
export const createAsyncThunk = cat.withTypes<{
  state: IRootState;
  dispatch: UseDispatch;
}>();
