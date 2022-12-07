import { configureStore } from "@reduxjs/toolkit";
import activityReport from "../activity-report/store/activity-report-sheet.state";
import activityReportSelection from "../activity-report/store/activity-report-sheet-selection.state";
import project from "../project/project.state";
import holidays from "../holidays/holidays.state";
import { useDispatch as dispatch } from "react-redux";
import { enableMapSet } from "immer";

enableMapSet();

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  reducer: {
    project,
    activityReport,
    holidays,
    activityReportSelection,
  },
  devTools: {
    serialize: {
      options: { map: true, set: true },
    },
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IRootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type UseDispatch = typeof store.dispatch;

export const useDispatch: () => UseDispatch = dispatch;
