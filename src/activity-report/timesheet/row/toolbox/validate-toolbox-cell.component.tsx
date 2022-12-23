import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useTimesheetToolboxCell } from "activity-report/hooks/use-timesheet-toolbox-cell.hook";
import { Button, Space } from "antd";
import { FC, useCallback } from "react";
import { Id } from "utils/types";

interface Props {
  activityReportId: Id;
}

export const ValidateToolboxCell: FC<Props> = (props) => {
  const { activityReportId } = props;
  const { rejectAll, approveAll } = useTimesheetToolboxCell(activityReportId);

  const onRejectAll = useCallback(() => {
    rejectAll();
  }, []);

  const onApproveAll = useCallback(() => {
    approveAll();
  }, []);

  return (
    <Space.Compact size="small">
      <Button onClick={onApproveAll} icon={<CheckOutlined />} type="primary" />
      <Button
        onClick={onRejectAll}
        icon={<CloseOutlined />}
        type="primary"
        danger
      />
    </Space.Compact>
  );
};
