import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { FC, useCallback } from "react";
import { Id } from "utils/types";
import {useCellToolboxApi} from "@hooks/use-cell-toolbox.hook";

interface Props {
  reportId: Id;
}

export const ValidateToolboxCell: FC<Props> = (props) => {
  const { reportId } = props;
  const { rejectAll, approveAll } = useCellToolboxApi(reportId);

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
