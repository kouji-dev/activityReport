import { Button, Col, Row, Space } from "antd";
import { FC } from "react";
import { Timesheet } from "./timesheet/timesheet.component";
import { Toolbox } from "./toolbox/toolbox.component";

interface Props {}

export const ActivityReport: FC<Props> = () => {
  return (
    <>
      <Toolbox />
      <Timesheet />
    </>
  );
};
