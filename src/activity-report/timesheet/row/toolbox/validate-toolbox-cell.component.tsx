import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { FC } from "react";
import { Id } from "utils/types";

interface Props {
  activityReportId: Id;
}

export const ValidateToolboxCell: FC<Props> = () => {
  return (
    <Space.Compact size="small">
      <Button icon={<CheckOutlined />} type="primary" />
      <Button icon={<CloseOutlined />} type="primary" danger />
    </Space.Compact>
  );
};
