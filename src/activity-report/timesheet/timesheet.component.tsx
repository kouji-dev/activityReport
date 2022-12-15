import { FC, useEffect } from "react";
import { useProject } from "../../project/useProject";
import { useSelector } from "react-redux";
import { isSheetLoading } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { Spin } from "antd";
import { TimesheetTable } from "./timesheet-table.component";
import cls from "classnames";
import { isDraggingSelector } from "activity-report/store/selectors/activity-report-sheet-selection.selectors";

interface Props {}

export const Timesheet: FC<Props> = () => {
  const {
    api: { loadData },
  } = useProject();
  const loading = useSelector(isSheetLoading);
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
