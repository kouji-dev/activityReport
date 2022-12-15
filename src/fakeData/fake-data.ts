import { fakeProject, IProject } from "../models/project.model";
import {
  fakeActivityReport,
  IActivityReport,
} from "../models/activity-report.model";
import { IStandardActivity } from "../models/standard-activity.model";
import {
  getDefaultHalfDay,
  SheetMode,
  SheetRow,
} from "../activity-report/timesheet/common-types";
import {
  fromServerFormat,
  isHoliday,
  isWeekend,
  toServerFormat,
} from "../utils/date-utils";
import keyBy from "lodash.keyby";
import memoize from "lodash.memoize";
import { ActivityReportSheetState } from "activity-report/store/activity-report-sheet.state";
import { ProjectState } from "project/project.state";
import moment from "moment";

const fakeProjects = (p: number = 10) => {
  return [...Array(p).keys()].map(() => fakeProject());
};

export const getFakeProjects = memoize((): ProjectState => {
  const projects: IProject[] = fakeProjects();
  const projectState: ProjectState = {
    ids: projects.map((project) => project.id),
    entities: keyBy(projects, "id"),
  };
  return projectState;
});

const fakeActivityReports = (projectIds: number[]) =>
  projectIds.map((projectId) => fakeActivityReport(projectId));

export const getFakeActivityReports = (
  projectIds: number[]
): ActivityReportSheetState => {
  const activityReports: IActivityReport[] = fakeActivityReports(projectIds);
  // const activities: Record<number, IStandardActivity[]> =
  //   activityReports.reduce((acc, activityReport) => {
  //     acc[activityReport.id] = fakeStandardActivity(activityReport.id);
  //     return acc;
  //   }, {});

  const result: ActivityReportSheetState = {
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

const getSheetRow = (
  activityReportId,
  activityReport: IActivityReport,
  activityReports: Record<number, IStandardActivity[]>
): SheetRow<IActivityReport, IStandardActivity> => {
  const result: SheetRow<IActivityReport, IStandardActivity> = {
    ids: [],
    entities: {},
    meta: activityReport,
  };

  for (const activity of activityReports[activityReportId]) {
    const { date, afternoon, morning, validationDate, validationStatus } =
      activity;

    result.ids.push(date);

    const momento = fromServerFormat(date);

    result.entities[date] = {
      date,
      afternoon: getDefaultHalfDay(afternoon),
      morning: getDefaultHalfDay(morning),
      isWeekend: isWeekend(momento),
      status: validationStatus,
      isHoliday: isHoliday(momento),
    };
  }

  return result;
};
