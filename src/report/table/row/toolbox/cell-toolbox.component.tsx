import { SheetMode } from "report/table/common-types";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Id } from "utils/types";
import { SelectionToolboxCell } from "./selection-toolbox-cell.component";
import { ValidateToolboxCell } from "./validate-toolbox-cell.component";
import {modeSelector} from "@store/selectors/report.selectors";

interface Props {
  reportId: Id;
}
export const CellToolbox: FC<Props> = (props) => {
  const { reportId } = props;
  const rootCls = "td toolbox-cell";
  const sheetMode: SheetMode = useSelector(modeSelector);

  let content;

  switch (sheetMode) {
    case SheetMode.EDITTING:
      content = <SelectionToolboxCell reportId={reportId} />;
      break;
    case SheetMode.VALIDATING:
      content = <ValidateToolboxCell reportId={reportId} />;
      break;
    default:
      content = <></>;
  }
  return <div className={rootCls}>{content}</div>;
};
