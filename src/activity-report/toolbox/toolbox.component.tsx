import { Space } from "antd";
import { SheetMode } from "./sheet-mode.component";
import { SheetSubmit } from "./submit/sheet-submit.component";
import { TimesheetStatus } from "./timesheet-status.component";

export const Toolbox = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "end",
        flexFlow: "column",
        gap: "10px",
      }}
    >
      <Space align="end">
        <SheetMode />
        <SheetSubmit />
      </Space>
      <TimesheetStatus />
    </div>
  );
};
