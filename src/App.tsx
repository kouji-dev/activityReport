import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Timesheet } from './activity-report/timesheet/timesheet.component';
import { ActivityReportSheetProvider } from './activity-report/useActivityReportSheet';
import { store } from './store';

export default function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <ActivityReportSheetProvider>
                    <Timesheet />
                </ActivityReportSheetProvider>
            </Provider>
        </div>
    );
}
