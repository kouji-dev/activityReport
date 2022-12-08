import { ActivityReport } from "activity-report/activity-report.component";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <ActivityReport />
    </Provider>
  );
}
