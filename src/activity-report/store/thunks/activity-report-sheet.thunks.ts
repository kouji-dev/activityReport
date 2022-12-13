import { createAsyncThunk } from "@reduxjs/toolkit";
import { fromKey } from "utils/sheet-utils";

export const submitReportsThunk = createAsyncThunk(
  `activity-report/submit`,
  async (selection: Set<string>) => {
    console.log(selection);
    return new Promise<any>((r) => {
      const mapped: { [key: string]: string[] } = {};
      for (const key of selection.values()) {
        const { activityReportId, day } = fromKey(key);
        if (!mapped[activityReportId]) mapped[activityReportId] = [];
        mapped[activityReportId].push(day);
      }
      r(mapped);
    });
  }
);
