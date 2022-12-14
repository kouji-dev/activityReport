import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { FC } from "react";
import { Id } from "utils/types";

interface Props {
  activityReportId: Id;
}

export const SelectionToolboxCell: FC<Props> = () => {
    const {selectAll, deselectAll} = use
  return (
    <Space size={0}>
      <Button onClick={selectAll} icon={<CheckOutlined />} type="primary" size="small" />
      <Button icon={<CloseOutlined />} type="primary" danger size="small" />
    </Space>
  );
};
