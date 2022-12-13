import { faker } from "@faker-js/faker";
import { getRandomDate } from "../utils/date-utils";
import memoize from "lodash.memoize";

export interface IActivityReport {
  id: number;
  month?: string;
  submitted?: boolean;
  submissionDate?: string;
  editable?: boolean;
  locked?: boolean;
  comment?: string;
  projectResourceId?: number;
}

export const fakeActivityReport = memoize(
  (
    projectId: number,
    month: number = 9,
    year: number = 2022
  ): IActivityReport => {
    const submitted = false;
    const submissionDate: string | undefined = undefined;

    const activityReport: IActivityReport = {
      id: faker.datatype.number(),
      month: getRandomDate(month, year),
      submissionDate,
      submitted,
      editable: true,
      projectResourceId: projectId,
    };

    return activityReport;
  }
);
