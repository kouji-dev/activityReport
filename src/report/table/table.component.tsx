import { memo } from "react";
import { Head } from "./head/head.component";
import { Body } from "./body.component";
import { Footer } from "./total/footer.component";

export const TimesheetTable = memo(() => {
  return (
    <div className="table-container">
      <Head />
      <Body />
      <Footer />
    </div>
  );
});
