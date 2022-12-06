import { createSelector } from '@reduxjs/toolkit';
import { activityReportSelector } from '../activity-report/activity-report-sheet.selectors';
import { IProject } from '../models/project.model';
import { IRootState } from '../store';
import { Id } from '../utils/types';
import { ProjectState } from './project.state';

export const selectRoot = (state: IRootState) => state.project;

export const projectIdsSelector = createSelector<IRootState, void, Id[]>(
  selectRoot,
  (state: ProjectState) => state.ids
);

export const projectEntitiesSelector = createSelector(
  selectRoot,
  (state: ProjectState) => state.entities
);

export const projectByIdSelector = (projectId: Id) => (state: IRootState) =>
  createSelector<IRootState, number, IProject>(
    projectEntitiesSelector,
    (_, projectId) => projectId,
    (entities, projectId) => entities[projectId]
  )(state, projectId);

export const projectByActivityReportIdSelector =
  (activityReportId: Id) => (state: IRootState) =>
    createSelector<IRootState, number, IProject>(
      projectEntitiesSelector,
      activityReportSelector,
      (entities, activityReport) => {
        if (!activityReport) return;
        const {
          meta: { projectResourceId },
        } = activityReport;

        if (!projectResourceId) return;

        return entities[projectResourceId];
      }
    )(state, activityReportId);
