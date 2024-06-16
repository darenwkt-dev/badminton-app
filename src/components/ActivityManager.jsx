import * as React from 'react';
import {useEffect, useState} from "react";
import dayjs from 'dayjs';

import {
  Box,
  Card,
  Badge,
  FormControl,
  FormControlLabel,
  FormLabel, IconButton,
  Radio,
  RadioGroup,
  Slider, Grid,
  Typography
} from "@mui/material";
import {LineChart} from '@mui/x-charts/LineChart';
import {BarChart} from '@mui/x-charts/BarChart';

import {calculateCostPerPlayer, calculateCourtOccupancy} from "../utils/CalculatorUtil";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CalculatorSlider from "./CalculatorSlider";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {PickersDay} from '@mui/x-date-pickers/PickersDay';

import {
  getActivitiesByGroupId,
  getActivityDetailsByGroupId,
  postActivity,
  postActivityDetails,
  postGroup
} from "../data/ActivityRestClient";
import LeaderboardTable from "./analytics/LeaderboardTable";
import Analytics from "./analytics/Analytics";
import WeeklyAnalytics from "./analytics/WeeklyAnalytics";
import ActivityCard from "./activity/ActivityCard";
import ActivityCreationCard from "./activity/ActivityCreationCard";
import ActivityDetailsCard from "./activity/ActivityDetailsCard";


export default function ActivityManager(props) {
  const [activityData, setActivityData] = useState([]);
  const [activityDetailsData, setActivityDetailsData] = useState([]);
  const [allData, setAllData] = useState({});
  const [sortedActivityDates, setSortedActivityDates] = useState([]);
  const [sortedActivityIds, setSortedActivityIds] = useState([]);
  const [highlightedDays, setHighlightedDays] = useState(getHighlightedDaysForDate(new Date().toString()));
  const [openCalendar, setOpenCalendar] = useState(false);
  const [calendarActivityData, setCalendarActivityData] = useState({
    date: new Date(),
    details: [],
    otherCost: 0,
    venueCost: 0,
    cost: 0,
  });

  useEffect(() => {
    getActivitiesByGroupId("testId", (data) => {
      setActivityData(data)
      console.log("getActivitiesByGroupId", data)
    });
    getActivityDetailsByGroupId("testId", (data) => {
      setActivityDetailsData(data)
      console.log("getActivityDetailsByGroupId", data)

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

  useEffect(() => {
    const data = {};
    const sortedActivityIdsTemp = [];

    activityData.forEach((activity) => {
      data[activity['activityId']] = {
        date: new Date(Number(activity['date'])),
        activityName: activity['activityName'],
        venueCost: activity['venueCost'],
        otherCost: activity['otherCost'],
        details: []
      };

      if (!isNaN(activity['date'])) {
        sortedActivityIdsTemp.push([new Date(Number(activity['date'])), activity['activityId']]);
      }
    });

    activityDetailsData.forEach((activityDetails) => {
      const activityId = activityDetails['activityId'];
      if (!(activityId in data)) {
        data[activityId] = {
          venueCost: 0.0,
          otherCost: 0.0,
          details: []
        };
      }
      data[activityId]['details'].push(activityDetails);
    });

    setAllData(data);

    sortedActivityIdsTemp.sort(function (a, b) {
      return -a[0].getTime() + b[0].getTime()
    });

    const sortedActivityDatesTemp = []
    for (let i = 0; i < sortedActivityIdsTemp.length; i++) {
      sortedActivityDatesTemp.push(new Date(sortedActivityIdsTemp[i][0]));
    }
    setSortedActivityDates(sortedActivityDatesTemp);

    setSortedActivityIds(sortedActivityIdsTemp);
    setHighlightedDays(getHighlightedDaysForDate(new Date().toString()));
    console.log("data", data);
    console.log("sortedActivityIdsTemp", sortedActivityIdsTemp);
  }, [activityData, activityDetailsData])

  function getHighlightedDaysForDate(newDate) {
    const newMonth = new Date(newDate).getMonth();
    const highlightedDaysTemp = [];

    activityData.forEach((activity) => {
      const activityDate = new Date(Number(activity['date']));

      if (activityDate.getMonth() === newMonth) {
        highlightedDaysTemp.push(activityDate.getDate())
      }
    });
    return highlightedDaysTemp;
  }

  function handleMonthChange(newDate) {
    setHighlightedDays(getHighlightedDaysForDate(newDate));
  }

  function handleDatePick(val) {
    const newDate = new Date(val);
    const matchedData = activityData.filter((activity) => {
      return new Date(Number(activity['date'])).toDateString() === newDate.toDateString()
    });
    if (matchedData.length === 0) {
      return;
    }

    const activity = allData[matchedData[0]['activityId']];
    setOpenCalendar(true);
    setCalendarActivityData({
      date: new Date(Number(activity['date'])),
      details: activity['details'],
      otherCost: activity['otherCost'],
      venueCost: activity['venueCost'],
      cost: activity['otherCost'] + activity['venueCost'],
    });
  }

  function resetParamToDefault() {
    // handleMonthChange(new Date());
  }

  return (
    <Card sx={{width: "auto", m: "auto", mt: 5, mb: 5, p: 0, boxShadow: 1, maxWidth: 1250}} variant="outlined">
      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1}}>
        <Typography variant="h3" gutterBottom sx={{width: "fit-content", mr: "auto"}} color="primary">
          Activity Manager
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Organise all activities in one-place 🗓️
        </Typography>
        <ActivityCreationCard/>
      </Box>


      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1}}>
        <Box sx={{display: "flex"}}>
          <Typography variant="h4" gutterBottom sx={{width: "fit-content", mr: "auto"}}>
            Activity Calendar
          </Typography>
          <IconButton color="primary" aria-label="add an alarm" sx={{mt: "auto"}} onClick={resetParamToDefault}>
            <RestartAltIcon/>
          </IconButton>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            defaultValue={dayjs(new Date())}
            loading={false}
            onMonthChange={handleMonthChange}
            onChange={handleDatePick}
            slots={{
              day: ActiveDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }}
          />
        </LocalizationProvider>
      </Box>

      <Box sx={{width: "auto", m: 2, mt: 4, p: 2, boxShadow: 0}}>
        <Typography variant="h4" sx={{width: "fit-content", mr: "auto"}}>
          Activity List
        </Typography>
      </Box>
      <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}} sx={{p: 2}}>
        {sortedActivityIds.map((key, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <ActivityCard title={allData[key[1]]['activityName']} date={allData[key[1]]['date']}
                          cost={allData[key[1]]['venueCost'] + allData[key[1]]['otherCost']}
                          details={allData[key[1]]['details']} venueCost={allData[key[1]]['venueCost']}
                          otherCost={allData[key[1]]['otherCost']}/>
          </Grid>
        ))}
      </Grid>
      <ActivityDetailsCard open={openCalendar} handleOpen={() => setOpenCalendar(true)}
                           handleClose={() => setOpenCalendar(false)} details={calendarActivityData['details']}
                           date={calendarActivityData['date']} cost={calendarActivityData['cost']}
                           venueCost={calendarActivityData['venueCost']} otherCost={calendarActivityData['otherCost']}/>

    </Card>
  );
}

function ActiveDay(props) {
  const {highlightedDays = [], day, outsideCurrentMonth, ...other} = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '✅' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day}/>
    </Badge>
  );
}