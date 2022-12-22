import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  SettingTwoTone,
} from "@ant-design/icons";
import { useTimesheetTableHeadToolboxCell } from "activity-report/hooks/use-timesheet-table-head-toolbox.hook";
import { Button, Popover, Space, Tooltip, Typography } from "antd";
import { FC } from "react";
import { HeadCol } from "./timesheet-head.component";

interface Props extends HeadCol {}

export const Th: FC<Props> = (props) => {
  const { date, isHoliday, isWeekend } = props;

  const dd = date.format("dd");
  const DD = date.format("DD");

  return (
    <th>
      <Typography.Text disabled={isHoliday || isWeekend} className="head">
        <small>{dd}</small>
        <b>{DD}</b>
      </Typography.Text>
    </th>
  );
};

export const ThProject: FC<{}> = () => {
  return (
    <th colSpan={1} className="head-project">
      <b>Projects</b>
    </th>
  );
};

export const TableHeadToolbox: FC<{}> = () => {
  const { unselectAll } = useTimesheetTableHeadToolboxCell();
  const content = (
    <Space.Compact block>
      <Tooltip title="Deselect All">
        <Button onClick={unselectAll} icon={<CloseCircleTwoTone />} />
      </Tooltip>
    </Space.Compact>
  );

  return (
    <th className="toolbox-head">
      <Popover content={content}>
        <div className="head-empty">
          <SettingTwoTone />
        </div>
      </Popover>
    </th>
  );
};
