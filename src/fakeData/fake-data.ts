import {fakeProjects, IProject} from "../models/project.model";
import {fakeReports, IReport,} from "../models/report.model";
import {SheetMode,} from "../report/table/common-types";
import {toServerFormat,} from "../utils/date-utils";
import {keyBy, memoize} from "lodash";
import {ReportState} from "report/store/report.state";
import {ProjectState} from "project/project.state";
import moment from "moment";

export const getFakeProjects = memoize((): ProjectState => {
  const projects: IProject[] = fakeProjects();
  return {
    ids: projects.map((project) => project.id),
    entities: keyBy(projects, "id"),
  };
});

export const getFakeReports = (
  projectIds: number[]
): ReportState => {
  const activityReports: IReport[] = fakeReports(projectIds);
  const result: ReportState = {
    ids: [],
    entities: {},
    columns: [],
    mode: SheetMode.EDITTING,
    month: toServerFormat(moment()),
    loading: false,
  };

  result.ids = activityReports.map((a) => a.id);

  for (const activityReport of activityReports) {
    const { id, ...rest } = activityReport;
    result.entities[id] = {
      ids: [],
      entities: {},
      meta: activityReport,
    };
  }

  return result;
};