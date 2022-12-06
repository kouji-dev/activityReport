import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '../store';

const selectRoot = (state: IRootState) => state.holidays;

export const holidaysSelectors = createSelector(
  selectRoot,
  (holidays) => holidays
)