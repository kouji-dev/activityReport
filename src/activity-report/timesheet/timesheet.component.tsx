import { FC, useEffect } from "react";
import { useProject } from "../../project/useProject";
import { TimesheetBody } from "./timesheet-body.component";
import { TimesheetFooterTotal } from "./total/timesheet-footer-total.component";
import { TimesheetHead } from "./head/timesheet-head.component";
import { useSelector } from "react-redux";
import { isSheetLoading } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { Spin } from "antd";

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
      <table>
        <TimesheetHead />
        <TimesheetBody />
        <TimesheetFooterTotal />
      </table>
    </Spin>
  );
};
