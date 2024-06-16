import * as React from 'react';
import {useEffect, useState} from "react";
import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel, IconButton,
  Radio,
  RadioGroup,
  Slider,
  Typography
} from "@mui/material";
import {
  getActivitiesByGroupId,
  getActivityDetailsByGroupId,
  postActivity,
  postActivityDetails,
  postGroup
} from "../../data/ActivityRestClient";
import Analytics from "./Analytics";


export default function AnalyticsMain(props) {
  const [activityData, setActivityData] = useState([]);
  const [activityDetailsData, setActivityDetailsData] = useState([]);


  useEffect(() => {
    getActivitiesByGroupId("testId", (data) => {
      setActivityData(data)
    });
    getActivityDetailsByGroupId("testId", (data) => {
      setActivityDetailsData(data)
    });
    // postActivity({
    //   activityId: "TEST",
    //   groupId: "testId",
    //   date: Date.now().toString(),
    //   numPlayers: 1,
    //   venueCost: 1.0,
    //   otherCost: 1.0,
    //   createdAt: Date.now().toString()
    // }, (event) => {
    //   console.log(event)
    // }, (event) => {
    //   console.log(event)
    // })
    // postActivityDetails({
    //   activityId: "TEST",
    //   groupId: "testId",
    //   activityDetailsId: "TEST",
    //   playerName: "TEST",
    //   paid: false,
    //   createdAt: 1
    // }, (event) => {
    //   console.log(event)
    // }, (event) => {
    //   console.log(event)
    // })
    postGroup({
      groupId: "testId",
      groupName: "TEST",
      createdAt: Date.now().toString()
    }, (event) => {
      console.log(event)
    }, (event) => {
      console.log(event)
    })

  }, [])



  function resetParamToDefault() {
  }

  return (
    <Card sx={{width: "auto", m: "auto", mt: 5, mb: 5, p: 0, boxShadow: 1, maxWidth: 1250}} variant="outlined">
      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1}}>
        <Typography variant="h3" gutterBottom sx={{width: "fit-content", mr: "auto"}} color="primary">
          Data Analytics
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          For the data geeks 🙃
        </Typography>
      </Box>
      <Analytics activityData={activityData} activityDetailsData={activityDetailsData}/>
    </Card>
  );
}