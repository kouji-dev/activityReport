import { createSelector } from "@reduxjs/toolkit";
import { IRootState } from "../store";
import { Id } from "../utils/types";
import { ProjectState } from "./project.state";
import {reportSelector} from "@store/selectors/report.selectors";

export const selectRoot = (state: IRootState) => state.project;

export const projectIdsSelector = createSelector(
  selectRoot,
  (state: ProjectState) => state.ids
);

export const projectEntitiesSelector = createSelector(
  selectRoot,
  (state: ProjectState) => state.entities
);

export const projectByIdSelector = (projectId: Id) => (state: IRootState) =>
  createSelector(
    projectEntitiesSelector,
    (_, projectId: Id) => projectId,
    (entities, projectId) => entities[projectId]
  )(state, projectId);

export const projectByReportIdSelector =
  (reportId: Id) => (state: IRootState) =>
    createSelector(
      projectEntitiesSelector,
      reportSelector,
      (entities, report) => {
        if (!report) return;
        const {
          meta: { projectResourceId },
        } = report;

        if (!projectResourceId) return;

        return entities[projectResourceId];
      }
    )(state, reportId);
