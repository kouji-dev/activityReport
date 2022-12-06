export const getKey = (activityReportId: Id, day: string) =>
  `${activityReportId}-${day}`;
