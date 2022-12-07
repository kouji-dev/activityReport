import { SheetStatus } from "activity-report/sheet-status";
import { FC } from "react";

interface Props {
  status: SheetStatus;
}

export const SheetStatusItem: FC<Props> = (props) => {
  const { status } = props;
  let icon,
      text;

  switch (status) {
    case SheetStatus.APPROVED:
      icon = <CheckOutlined />
      break;
  }
  return (
    <small>
      
    </small>
  );
};
