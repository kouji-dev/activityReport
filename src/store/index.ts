import { configureStore } from '@reduxjs/toolkit';
import activityReport from '../activity-report/activity-report-sheet.state';
import project from '../project/project.state';
import holidays from '../holidays/holidays.state';
import { useDispatch as dispatch } from 'react-redux';
import { projectByIdSelector } from '../project/project.selectors';

export const store = configureStore({
  reducer: {
    project,
    activityReport,
    holidays,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IRootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type UseDispatch = typeof store.dispatch;

export const useDispatch: () => UseDispatch = dispatch;
