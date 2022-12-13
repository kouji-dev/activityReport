import { sheetModeSelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { modes, SheetMode as T } from "activity-report/timesheet/common-types";
import { Select } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";

const options = modes.map((m) => ({
  value: m,
  label: m,
}));

export const SheetMode = memo(() => {
  const selectedMode = useSelector(sheetModeSelector);
  return (
    <Select dropdownMatchSelectWidth value={selectedMode} options={options} />
  );
});
