import { FC, useEffect } from "react";
import { useProject } from "@project/useProject";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { TimesheetTable } from "./table.component";
import cls from "classnames";
import {isDraggingSelector} from "@store/selectors/report-selection.selectors";
import {isLoadingSelector} from "@store/selectors/report.selectors";

interface Props {}

export const Timesheet: FC<Props> = () => {
  const {
    api: { loadData },
  } = useProject();
  const loading = useSelector(isLoadingSelector);
  const isDragging = useSelector(isDraggingSelector);

  useEffect(() => {
    loadData();
  }, []);

  const className = cls({ dragging: isDragging });

  return (
    <Spin wrapperClassName={className} spinning={loading}>
      <TimesheetTable />
    </Spin>
  );
};
