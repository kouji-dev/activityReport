import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useTimesheetToolboxCell } from "activity-report/hooks/use-timesheet-toolbox-cell.hook";
import { Button, Space } from "antd";
import { FC, useCallback } from "react";
import { Id } from "utils/types";

interface Props {
  activityReportId: Id;
}

export const SelectionToolboxCell: FC<Props> = (props) => {
  const { activityReportId } = props;
  const { undeclareAll, declareAll } = useTimesheetToolboxCell();

  const onDeclareAll = useCallback(() => {
    declareAll(activityReportId);
  }, []);

  const onUnDeclareAll = useCallback(() => {
    undeclareAll(activityReportId);
  }, []);

  return (
    <Space size={0}>
      <Button
        onClick={onDeclareAll}
        icon={<CheckOutlined />}
        type="primary"
        size="small"
      />
      <Button
        onClick={onUnDeclareAll}
        icon={<CloseOutlined />}
        type="primary"
        danger
        size="small"
      />
    </Space>
  );
};
