import React, { FC } from "react";
import { useSelector } from "react-redux";
import { HeadCol } from "../head/head.component";
import {dayTotalSelector} from "@store/selectors/report.selectors";

interface Props extends HeadCol {}

export const ColumnTotal: FC<Props> = (props) => {
  const { day } = props;
  const total = useSelector(dayTotalSelector(day));
  return <div className="tf total-col">{total}</div>;
};
