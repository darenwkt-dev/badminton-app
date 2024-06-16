import * as React from 'react';
import {useEffect, useState} from "react";
import {
  Box,
  Card, CardContent,
  FormControl,
  FormControlLabel,
  FormLabel, IconButton,
  Radio,
  RadioGroup,
  Slider,
  Typography
} from "@mui/material";
import {LineChart} from "@mui/x-charts/LineChart";
import {BarChart} from "@mui/x-charts/BarChart";
import AnalyticsCard from "./AnalyticsCard";
import SessionAnalytics from "./SessionAnalytics";
import WeeklyAnalytics from "./WeeklyAnalytics";
import IndividualAnalytics from "./IndividualAnalytics";


const defaultAnalyticsData = () => {
  return {
    'session': {
      'totalCost': 0,
      'totalSession': 0,
      'totalPendingPayments': 0,
      'totalAttendance': 0,
    },
    'costPerSession': {
      'min': Number.MAX_VALUE,
      'max': 0,
      'mean': 0,
      'p50': 0,
      'p90': 0,
      'p99': 0,
      'distribution': [],
      'seriesData': {'x': [1], 'y': [1]}
    },
    'attendancePerSession': {
      'min': Number.MAX_VALUE,
      'max': 0,
      'mean': 0,
      'p50': 0,
      'p90': 0,
      'p99': 0,
      'distribution': [],
      'seriesData': {'x': [1], 'y': [1]}
    },
    'costPerPerson': {
      'min': Number.MAX_VALUE,
      'max': 0,
      'mean': 0,
      'p50': 0,
      'p90': 0,
      'p99': 0,
      'distribution': [],
      'seriesData': {'x': [1], 'y': [1]}
    },
  };
};


export default function Analytics(props) {
  const [analyticsData, setAnalyticsData] = useState(defaultAnalyticsData());

  useEffect(() => {
    const analyticsDataTemp = defaultAnalyticsData();
    analyticsDataTemp['session']['totalSession'] = props.activityData.length;

    props.activityData.forEach((activity) => {
      const cost = activity['otherCost'] + activity['venueCost'];
      const numPlayers = activity['numPlayers'];

      analyticsDataTemp['session']['totalCost'] += cost;

      updateAnalyticsStats(analyticsDataTemp['costPerSession'], cost);
      updateAnalyticsStats(analyticsDataTemp['costPerPerson'], cost / numPlayers);
      updateAnalyticsStats(analyticsDataTemp['attendancePerSession'], numPlayers);
      // console.log(activity);
    })
    props.activityDetailsData.forEach((activityDetails) => {
      analyticsDataTemp['session']['totalPendingPayments'] += activityDetails['paid'] ? 0 : 1
      analyticsDataTemp['session']['totalAttendance'] += 1
      // console.log(activityDetails);
    })
    console.log("analyticsDataTemp", analyticsDataTemp);
    setAnalyticsData(analyticsDataTemp);

  }, [props.activityData, props.activityDetailsData])


  function updateAnalyticsStats(stats, val) {
    stats['max'] = Math.max(stats['max'], val);
    stats['min'] = Math.min(stats['min'], val);
    stats['distribution'].push(val);
    stats['distribution'].sort();
    const sum = stats['distribution'].reduce((partialSum, a) => partialSum + a, 0);
    const n = stats['distribution'].length;
    stats['mean'] = sum / n;
    stats['p50'] = stats['distribution'][Math.floor(n * 0.5)]
    stats['p90'] = stats['distribution'][Math.floor(n * 0.9)]
    stats['p99'] = stats['distribution'][Math.floor(n * 0.99)]
    const counter = {};
    stats['seriesData']['x'] = [];
    stats['seriesData']['y'] = [];

    for (const i in stats['distribution']) {
      const val = Math.round(stats['distribution'][i]*10)/10;
      if (!(val in counter)) {
        counter[val] = 0
      }
      counter[val]++;
    }

    const vals = Object.keys(counter).map(val => Number(val));
    // console.log(vals)
    vals.sort((a,b)=>Number(a)-Number(b));
    stats['seriesData']['x'] = [...vals];
    // console.log('b',stats['seriesData']['x'])

    for (const i in stats['seriesData']['x']) {
      const key = stats['seriesData']['x'][i];
      stats['seriesData']['y'].push(counter[key]);
    }
    // console.log('a',stats['seriesData']['x'])
  }

  return (
    <Card sx={{width: "auto", m: 2, p: 0, boxShadow: 1, maxWidth: 1250}} variant="outlined">
      <OverallAnalytics analyticsData={analyticsData}/>
      <SessionAnalytics analyticsData={analyticsData}/>
      <WeeklyAnalytics activityData={props.activityData} activityDetailsData={props.activityDetailsData}/>
      <IndividualAnalytics activityData={props.activityData} activityDetailsData={props.activityDetailsData}/>
    </Card>
  )
}

function OverallAnalytics(props) {
  return (
    <Box sx={{width: "auto", m: 0, p: 2, boxShadow: 0}}>
      <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
        In total,
      </Typography>
      <Box sx={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
        <AnalyticsCard preText={""} val={props.analyticsData['session']['totalSession']} postText={"sessions organised"}/>
        <AnalyticsCard preText={""} val={`£${Math.round(props.analyticsData['session']['totalCost'])}`}
                       postText={"paid"}/>
        <AnalyticsCard preText={""} val={props.analyticsData['session']['totalAttendance']} postText={"people joined"}/>
        <AnalyticsCard preText={""} val={props.analyticsData['session']['totalPendingPayments']}
                       postText={"pending payments"}/>
      </Box>
    </Box>
  )
}

