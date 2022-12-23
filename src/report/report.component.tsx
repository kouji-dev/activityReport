import { FC } from "react";
import { Timesheet } from "./table/timesheet.component";
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
