import {Box, Typography} from "@mui/material";
import {LineChart} from "@mui/x-charts/LineChart";
import * as React from 'react';
import {useEffect, useState} from "react";


export default function WeeklyAnalytics(props) {
  const [weeklyCostData, setWeeklyCostData] = useState({'date': [], 'cost': [], 'numPlayer': []});

  useEffect(() => {
    const weeklyData = {'date': [], 'cost': [], 'numPlayer': []};
    const weeklyDataRaw = [];

    props.activityData.forEach((activity) => {
      if (!isNaN(activity['date'])) {
        weeklyDataRaw.push([new Date(Number(activity['date'])), activity['activityId'], activity['venueCost'], activity['numPlayers']]);
      }
    });

    weeklyDataRaw.sort(function (a, b) {
      return a[0] - b[0]
    });

    for (let i = 0; i < weeklyDataRaw.length; i++) {
      weeklyData['date'].push(weeklyDataRaw[i][0]);
      weeklyData['cost'].push(weeklyDataRaw[i][2]);
      weeklyData['numPlayer'].push(weeklyDataRaw[i][3]);
    }


    setWeeklyCostData(weeklyData);
    console.log("weeklyData", weeklyData);
  }, [props.activityData, props.activityDetailsData])
  
  return (
    <Box sx={{width: "auto", m: 0, p: 2, boxShadow: 0}}>
      <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
        At every week,
      </Typography>
      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1}}>
        <Typography sx={{fontSize: 12}} color="text.secondary" gutterBottom sx={{width: "fit-content", mr: "auto"}}>
          Weekly attendance
        </Typography>
        {weeklyCostData && weeklyCostData['date'].length > 0 &&
          <>
            <LineChart
              xAxis={[{
                data: weeklyCostData['date'],
                valueFormatter: (date) => (new Date(date).getMonth() + 1) + '/' + new Date(date).getDate(),
              }]}
              series={[
                {
                  data: weeklyCostData['numPlayer'],
                },
              ]}
              // width={500}
              height={300}
            />
          </>
        }
      </Box>
      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1}}>
        <Typography sx={{fontSize: 12}} color="text.secondary" gutterBottom sx={{width: "fit-content", mr: "auto"}}>
          Weekly payment
        </Typography>
        {weeklyCostData && weeklyCostData['date'].length > 0 &&
          <>
            <LineChart
              xAxis={[{
                data: weeklyCostData['date'],
                valueFormatter: (date) => (new Date(date).getMonth() + 1) + '/' + new Date(date).getDate(),
              }]}
              series={[
                {
                  data: weeklyCostData['cost'],
                },
              ]}
              height={300}
            />
          </>
        }
      </Box>
    </Box>
  )
}