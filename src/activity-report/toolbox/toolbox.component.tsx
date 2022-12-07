import { Button, Space } from "antd";
import { TimesheetStatus } from "./timesheet-status.component";

export const Toolbox = () => {
  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <Space align="end">
        <Button>Approve</Button>
      </Space>
      <TimesheetStatus />
    </div>
  );
};
