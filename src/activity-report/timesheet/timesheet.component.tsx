import { FC, useEffect } from "react";
import { useProject } from "../../project/useProject";
import { useSelector } from "react-redux";
import { isSheetLoading } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { Spin } from "antd";
import { TimesheetTable } from "./timesheet-table.component";

interface Props {}

export const Timesheet: FC<Props> = () => {
  const {
    api: { loadData },
  } = useProject();
  const loading = useSelector(isSheetLoading);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Spin spinning={loading}>
      <TimesheetTable />
    </Spin>
  );
};
