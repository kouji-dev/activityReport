import { canSubmitSelector } from "activity-report/store/selectors/activity-report-sheet.selectors";
import { Button } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";

export const SheetSubmit = memo(() => {
  const canSubmit = useSelector(canSubmitSelector);

  if (!canSubmit) return <></>;

  return <Button>Submit</Button>;
});
