import * as React from 'react';
import {useEffect, useState} from "react";
import './App.css';
import SessionLogin from "./components/SessionLogin";
import Session from "./components/Session";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Calculator from "./components/Calculator";
import {Box} from "@mui/material";
import SwipeableTemporaryDrawer from "./components/SwipeableTemporaryDrawer";
import CalculatorTable from "./components/CalculatorTable";
import ButtonAppBar from "./components/ButtonAppBar";
import ActivityManager from "./components/ActivityManager";
import AnalyticsMain from "./components/analytics/AnalyticsMain";
import {getActivitiesByGroupId, getActivityDetailsByGroupId, postGroup} from "./data/ActivityRestClient";
import CheatSheetMain from "./components/cheatsheet/CheatSheetMain";
import Main from "./components/Main";

function App() {
  // const [activityData, setActivityData] = useState([]);
  // const [activityDetailsData, setActivityDetailsData] = useState([]);
  // useEffect(() => {
  //   getActivitiesByGroupId("testId", (data) => {
  //     setActivityData(data)
  //   });
  //   getActivityDetailsByGroupId("testId", (data) => {
  //     setActivityDetailsData(data)
  //   });
  // }, [])

  return (
    <Box>
      <BrowserRouter>
        <ButtonAppBar/>
        <Routes>
          <Route path="/" element={<Main />}>
          </Route>
          <Route exact path="/login" element={<SessionLogin />} />
          <Route exact path="/session" element={<Session />} />
          <Route exact path="/calculator" element={<Calculator />} />
          <Route exact path="/activity" element={<ActivityManager/>} />
          <Route exact path="/analytics" element={<AnalyticsMain/>} />
          <Route exact path="/cheatsheet" element={<CheatSheetMain/>} />

        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
