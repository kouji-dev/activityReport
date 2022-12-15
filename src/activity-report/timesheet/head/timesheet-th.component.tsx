import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  SettingTwoTone,
} from "@ant-design/icons";
import { Button, Popover, Space, Tooltip } from "antd";
import { FC } from "react";
import { HeadCol } from "./timesheet-head.component";

interface Props extends HeadCol {}

export const Th: FC<Props> = (props) => {
  const { date } = props;

  const dd = date.format("dd");
  const DD = date.format("DD");

  return (
    <th colSpan={0}>
      <div className="head">
        <small>{dd}</small>
        <b>{DD}</b>
      </div>
    </th>
  );
};

export const ThProject: FC<{}> = () => {
  return (
    <th colSpan={3}>
      <div className="head-project">
        <b>Projects</b>
      </div>
    </th>
  );
};

export const TableHeadToolbox: FC<{}> = () => {
  const {selectAll} = u
  const content = (
    <Space.Compact block>
      <Tooltip title="Select All">
        <Button icon={<CheckCircleTwoTone />} />
      </Tooltip>
      <Tooltip title="Deselect All">
        <Button icon={<CloseCircleTwoTone />} />
      </Tooltip>
    </Space.Compact>
  );

  return (
    <th colSpan={2}>
      <Popover content={content}>
        <div className="head-empty">
          <SettingTwoTone />
        </div>
      </Popover>
    </th>
  );
};
