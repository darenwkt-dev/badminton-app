import {LineChart} from "@mui/x-charts/LineChart";
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
import LeaderboardTable from "./LeaderboardTable";

export default function IndividualAnalytics(props) {
  const [weeklyPlayerDataSeries, setWeeklyPlayerDataSeries] = useState({'attendance': [], 'pendingPayment': []});
  const [sortedActivityDates, setSortedActivityDates] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedWeeklyPlayerDataSeriesData, setSelectedWeeklyPlayerDataSeriesData] = useState({'attendance': [], 'pendingPayment': []});

  const stringToColour = (str) => {
    let hash = 0;
    str.split('').forEach(char => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      colour += value.toString(16).padStart(2, '0')
    }
    return colour
  }

  useEffect(() => {
    const weeklyPlayerDataSeriesTemp = {'attendance': [], 'pendingPayment': []};

    for (let i = 0; i < weeklyPlayerDataSeries.attendance.length; i++) {
      if (selected.includes(weeklyPlayerDataSeries.attendance[i].id)) {
        weeklyPlayerDataSeriesTemp['attendance'].push(weeklyPlayerDataSeries.attendance[i]);
        weeklyPlayerDataSeriesTemp['pendingPayment'].push(weeklyPlayerDataSeries.pendingPayment[i]);
      }
    }
    setSelectedWeeklyPlayerDataSeriesData(weeklyPlayerDataSeriesTemp);
    console.log("weeklyPlayerDataSeries",weeklyPlayerDataSeries);
      console.log("selected",selected);

    }, [selected]
  )

  useEffect(() => {
    const weeklyDataMap = {};
    const sortedActivityIds = [];

    props.activityData.forEach((activity) => {

      if (!isNaN(activity['date'])) {
        weeklyDataMap[activity['activityId']] = {
          cost: activity['venueCost'] + activity['otherCost'],
          numPlayers: activity['numPlayers'],
          date: new Date(Number(activity['date']))
        }
        // weeklyDataRaw.push([new Date(Number(activity['date'])), activity['activityId'], activity['venueCost'], activity['numPlayers']]);
        sortedActivityIds.push([new Date(Number(activity['date'])), activity['activityId']]);
      }

    });

    const leaderboardDataTemp = {};
    const playerData = {};
    const weeklyPlayerData = {'attendance': {}, 'pendingPayment': {}, 'totalCost': {}};
    props.activityDetailsData.forEach((activityDetails) => {
      const activityId = activityDetails['activityId'];

      const playerName = activityDetails['playerName'];
      if (!(playerName in playerData)) {
        playerData[playerName] = {'color': stringToColour(playerName)}
      }
      playerData[playerName][activityId] = activityDetails['paid'];

      if (!(playerName in leaderboardDataTemp)) {
        leaderboardDataTemp[playerName] = {'attendance': 0, 'pendingPayment': 0, 'totalCost': 0, 'color': playerData[playerName]['color']}
      }
      leaderboardDataTemp[playerName]['attendance'] += 1;
      leaderboardDataTemp[playerName]['pendingPayment'] += activityDetails['paid'] === false;
      leaderboardDataTemp[playerName]['totalCost'] += Math.round(weeklyDataMap[activityId]['cost']/weeklyDataMap[activityId]['numPlayers']*100.0)/100.0;

    });

    setLeaderboardData(leaderboardDataTemp);

    sortedActivityIds.sort(function (a, b) {
      return a[0] - b[0]
    });

    const sortedActivityDatesTemp = []
    for (let i = 0; i < sortedActivityIds.length; i++) {
      sortedActivityDatesTemp.push(new Date(sortedActivityIds[i][0]));
    }
    setSortedActivityDates(sortedActivityDatesTemp);


    const playerNames = Object.keys(playerData);
    for (let i = 0; i < playerNames.length; i++) {
      weeklyPlayerData['attendance'][playerNames[i]] = []
      weeklyPlayerData['pendingPayment'][playerNames[i]] = []
    }
    for (let i = 0; i < sortedActivityIds.length; i++) {
      const activityId = sortedActivityIds[i][1];

      for (let j = 0; j < playerNames.length; j++) {
        (activityId in playerData[playerNames[j]]) ? weeklyPlayerData['attendance'][playerNames[j]].push(1) : weeklyPlayerData['attendance'][playerNames[j]].push(0);
        (activityId in playerData[playerNames[j]]) ? weeklyPlayerData['pendingPayment'][playerNames[j]].push(playerData[playerNames[j]][activityId] ? 0 : 1) : weeklyPlayerData['pendingPayment'][playerNames[j]].push(0);
      }
    }

    const weeklyPlayerDataSeriesTemp = {'attendance': [], 'pendingPayment': []};
    const topWeeklyPlayerDataSeriesTemp = [];
    for (let i = 0; i < playerNames.length; i++) {
      weeklyPlayerDataSeriesTemp['attendance'].push(
        {
          id: playerNames[i],
          label: playerNames[i],
          data: weeklyPlayerData['attendance'][playerNames[i]],
          stack: 'total',
          area: false,
          showMark: true,
          color: playerData[playerNames[i]]['color'],
          hideTooltip: true
        }
      )
      weeklyPlayerDataSeriesTemp['pendingPayment'].push(
        {
          id: playerNames[i],
          label: playerNames[i],
          data: weeklyPlayerData['pendingPayment'][playerNames[i]],
          stack: 'total',
          area: false,
          showMark: true,
          color: playerData[playerNames[i]]['color'],
          hideTooltip: true
        }
      )
      const attendance = weeklyPlayerData['attendance'][playerNames[i]].reduce((a,b) => a+b,0);
      if (topWeeklyPlayerDataSeriesTemp.length < 7) {
        topWeeklyPlayerDataSeriesTemp.push([playerNames[i], attendance]);
      } else if (topWeeklyPlayerDataSeriesTemp[topWeeklyPlayerDataSeriesTemp.length-1][1] < attendance) {
        topWeeklyPlayerDataSeriesTemp.pop();
        topWeeklyPlayerDataSeriesTemp.push([playerNames[i], attendance]);
      }
      topWeeklyPlayerDataSeriesTemp.sort(function (a, b) {
        return - a[1] + b[1]
      });
    }

    setSelectedWeeklyPlayerDataSeriesData(weeklyPlayerDataSeriesTemp);
    setSelected(topWeeklyPlayerDataSeriesTemp.map(arr => arr[0]));
    setWeeklyPlayerDataSeries(weeklyPlayerDataSeriesTemp);
    console.log("playerData", playerData);
    console.log("weeklyPlayerData", weeklyPlayerData);
    console.log("sortedActivityDatesTemp", sortedActivityDatesTemp);
    console.log("weeklyPlayerDataSeriesTemp", weeklyPlayerDataSeriesTemp);
  }, [props.activityData, props.activityDetailsData])

  return (
    <Box sx={{width: "auto", m: 0, p: 2, boxShadow: 0}}>
      <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
        For every individual,
      </Typography>
      <Card sx={{margin: 2}}>
        <CardContent>

          <Typography sx={{fontSize: 12}} color="text.secondary" gutterBottom sx={{width: "fit-content", mr: "auto"}}>
            Individual weekly attendance
          </Typography>
          <LineChart
            xAxis={[
              {
                id: 'Years',
                data: sortedActivityDates,
                scaleType: 'date',
                valueFormatter: (date) => (new Date(date).getMonth() + 1) + '/' + new Date(date).getDate(),
              },
            ]}
            series={selectedWeeklyPlayerDataSeriesData['attendance']}
            sx={{
              // '--ChartsLegend-itemWidth': '100px',
              "--ChartsLegend-rootOffsetY": "30px",
            }}
            // width={"100%"}
            height={300}
            // margin={{bottom: 300}}
            legend={{
              direction: "row",
              position: {
                vertical: "bottom",
                horizontal: "middle"
              }
            }}
            highlightScope={{
              highlighted: "series",
              faded: "global",
            }}
          />
        </CardContent>
      </Card>
      <Card sx={{margin: 2}}>
        <CardContent>
          <Typography sx={{fontSize: 12}} color="text.secondary" gutterBottom sx={{width: "fit-content", mr: "auto"}}>
            Individual weekly pending payment
          </Typography>
          <LineChart
            xAxis={[
              {
                id: 'Years',
                data: sortedActivityDates,
                scaleType: 'date',
                valueFormatter: (date) => (new Date(date).getMonth() + 1) + '/' + new Date(date).getDate(),
              },
            ]}
            series={selectedWeeklyPlayerDataSeriesData['pendingPayment']}
            sx={{
              "--ChartsLegend-rootOffsetY": "30px",
            }}
            height={300}
            // margin={{bottom: 300}}
            legend={{
              direction: "row",
              position: {
                vertical: "bottom",
                horizontal: "middle"
              }
            }}
            highlightScope={{
              highlighted: "series",
              faded: "global",
            }}
          />
        </CardContent>
      </Card>

      <Card sx={{margin: 2}}>
        <CardContent>
          <LeaderboardTable selected={selected} setSelected={setSelected} leaderboardData={leaderboardData} />
        </CardContent>
      </Card>
    </Box>
  )
}