import { createSlice } from '@reduxjs/toolkit';

const namespace = `holidays`;

export type HolidayState = number[];
export const initialState: HolidayState = [6, 7];

export const holidayState = createSlice({
  name: `${namespace}`,
  initialState,
  reducers: {},
});

// Reducer
export default holidayState.reducer;
