import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityReportActions } from '../activity-report/activity-report-sheet.state';
import { getFakeProjects } from '../fakeData/fake-data';
import { IProject } from '../models/project.model';
import { Entity } from '../utils/types';

const namespace = `project`;

export type ProjectState = Entity<IProject>;
export const initialState: ProjectState = {
  ids: [],
  entities: {},
};

export const projectState = createSlice({
  name: `${namespace}`,
  initialState,
  reducers: {
    load: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProjects.fulfilled,
      (state: ProjectState, action: PayloadAction<ProjectState>) => {
        return action.payload;
      }
    );
  },
});

const fetchProjects = createAsyncThunk(
  `${namespace}/fetchData`,
  async (_, { dispatch }) => {
    return new Promise<ProjectState>((resolve) => {
      setTimeout(() => {
        const state = getFakeProjects();
        dispatch(ActivityReportActions.fetchActivityReports(state.ids));
        resolve(state);
      }, Math.random() * 2500);
    });
  }
);

// Action creators are generated for each case reducer function
export const ProjectActions = {
  ...projectState.actions,
  fetchProjects,
};

// Reducer
export default projectState.reducer;
