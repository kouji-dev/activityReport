import { FC } from "react";
import {
  CheckCircleTwoTone,
  MailTwoTone,
  CloseCircleTwoTone,
  EditTwoTone,
  ClockCircleTwoTone,
} from "@ant-design/icons";
import {ReportStatus} from "../report-status";

interface Props {
  status: ReportStatus;
}

export const SheetStatusItem: FC<Props> = (props) => {
  const { status } = props;
  let icon, text;

  switch (status) {
    case ReportStatus.NEW:
      icon = <EditTwoTone />;
      text = "En cours de création";
      break;
    case ReportStatus.DELAYED:
      icon = <ClockCircleTwoTone />;
      text = "En retard";
      break;
    case ReportStatus.SUBMITTED:
      icon = <MailTwoTone />;
      text = "Soumis";
      break;
    case ReportStatus.APPROVED:
      icon = <CheckCircleTwoTone />;
      text = "Apprové";
      break;
    case ReportStatus.REJECTED:
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
