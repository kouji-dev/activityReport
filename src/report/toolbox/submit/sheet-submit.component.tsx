import { Button } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";
import {useSubmitApi} from "@hooks/use-submit.hook";
import {canSubmitSelector} from "@store/selectors/report.selectors";

export const SheetSubmit = memo(() => {
  const canSubmit = useSelector(canSubmitSelector);
  const { submit } = useSubmitApi();

  if (!canSubmit) return <></>;

  return <Button onClick={submit}>Submit</Button>;
});
