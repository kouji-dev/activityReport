import { modes } from "report/table/common-types";
import { Select } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";
import {modeSelector} from "@store/selectors/report.selectors";
import {useModeApi} from "@hooks/use-mode.hook";

const options = modes.map((m) => ({
  value: m,
  label: m,
}));

export const SheetMode = memo(() => {
  const selectedMode = useSelector(modeSelector);
  const { updateMode } = useModeApi();
  return (
    <Select
      dropdownMatchSelectWidth
      value={selectedMode}
      onChange={updateMode}
      options={options}
    />
  );
});
