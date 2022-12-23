import {faker} from "@faker-js/faker";
import {memoize} from "lodash";
import {getRandomDate} from "../utils/date-utils";

export interface IReport {
  id: number;
  month?: string;
  submitted?: boolean;
  submissionDate?: string;
  editable?: boolean;
  locked?: boolean;
  comment?: string;
  projectResourceId?: number;
}

export const fakeReport = memoize(
  (
    projectId: number,
    month: number = 9,
    year: number = 2022
  ): IReport => {
    const submitted = false;
    const submissionDate: string | undefined = undefined;

    const report: IReport = {
      id: faker.datatype.number(),
      month: getRandomDate(month, year),
      submissionDate,
      submitted,
      editable: true,
      projectResourceId: projectId,
    };

    return report;
  }
);
export const fakeReports = (projectIds: number[]) =>
    projectIds.map((projectId) => fakeReport(projectId));