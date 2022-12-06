import React, { FC } from "react";
import { HeadCol } from "./timesheet-head.component";

interface Props extends HeadCol {}

export const Th: FC<Props> = (props) => {
  const { date } = props;

  const dd = date.format("dd");
  const DD = date.format("DD");

  return (
    <th colSpan={0}>
      <div className="cell">
        <small>{dd}</small>
        <b>{DD}</b>
      </div>
    </th>
  );
};

export const ThProject: FC<{}> = () => {
  return (
    <th colSpan={3}>
      <div className="cell-project">
        <b>Projects</b>
      </div>
    </th>
  );
};
