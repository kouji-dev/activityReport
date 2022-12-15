import { SheetStatus } from "activity-report/sheet-status";
import { FC } from "react";
import {
  CheckCircleTwoTone,
  MailTwoTone,
  CloseCircleTwoTone,
  EditTwoTone,
  ClockCircleTwoTone,
} from "@ant-design/icons";

interface Props {
  status: SheetStatus;
}

export const SheetStatusItem: FC<Props> = (props) => {
  const { status } = props;
  let icon, text;

  switch (status) {
    case SheetStatus.NEW:
      icon = <EditTwoTone />;
      text = "En cours de création";
      break;
    case SheetStatus.DELAYED:
      icon = <ClockCircleTwoTone />;
      text = "En retard";
      break;
    case SheetStatus.SUBMITTED:
      icon = <MailTwoTone />;
      text = "Soumis";
      break;
    case SheetStatus.APPROVED:
      icon = <CheckCircleTwoTone />;
      text = "Apprové";
      break;
    case SheetStatus.REJECTED:
      icon = <CloseCircleTwoTone />;
      text = "Refusé";
      break;
  }
  return (
    <small>
      {icon}
      {text}
    </small>
  );
};
