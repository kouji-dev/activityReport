import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { FC, useCallback } from "react";
import { Id } from "utils/types";
import {useCellToolboxApi} from "@hooks/use-cell-toolbox.hook";

interface Props {
  reportId: Id;
}

export const SelectionToolboxCell: FC<Props> = (props) => {
  const { reportId } = props;
  const { undeclareAll, declareAll } = useCellToolboxApi(reportId);

  const onDeclareAll = useCallback(() => {
    declareAll();
  }, []);

  const onUnDeclareAll = useCallback(() => {
    undeclareAll();
  }, []);

  return (
    <Space.Compact size="small">
      <Button onClick={onDeclareAll} icon={<CheckOutlined />} type="primary" />
      <Button
        onClick={onUnDeclareAll}
        icon={<CloseOutlined />}
        type="primary"
        danger
      />
    </Space.Compact>
  );
};
