import { CloseCircleTwoTone, SettingTwoTone } from "@ant-design/icons";
import { Button, Popover, Space, Tooltip, Typography } from "antd";
import { FC } from "react";
import { HeadCol } from "./head.component";
import {useHeadToolboxApi} from "@hooks/use-head-toolbox.hook";

interface Props extends HeadCol {}

export const Th: FC<Props> = (props) => {
  const { date, isHoliday, isWeekend } = props;

  const dd = date.format("dd");
  const DD = date.format("DD");

  return (
    <div className="th">
      <Typography.Text disabled={isHoliday || isWeekend} className="date">
        <small>{dd}</small>
        <b>{DD}</b>
      </Typography.Text>
    </div>
  );
};


