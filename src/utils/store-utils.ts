import { isEqual } from "lodash";
import { createSelectorCreator, defaultMemoize } from "reselect";

export type Action<T extends string, P extends unknown = unknown> = {
  type: T;
  payload?: P;
};

export type ActionCreator<A, P = unknown> = (payload?: P) => A;

export const createSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)