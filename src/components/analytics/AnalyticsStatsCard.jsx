import {Box, Card, CardContent, Typography} from "@mui/material";
import {LineChart} from "@mui/x-charts/LineChart";
import * as React from 'react';
import {useEffect, useState} from "react";
import AnalyticsCard from "./AnalyticsCard";

export default function AnalyticsStatsCard(props)
{
  return (

    <Card sx={{margin: 0, mt: 2, mb: 2}}>
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {props.title}
        </Typography>
        <Box sx={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
          <AnalyticsCard preText={props.min.preText} val={props.min.val}
                         postText={props.min.postText}/>
          <AnalyticsCard preText={props.max.preText} val={props.max.val}
                         postText={props.max.postText}/>
          <AnalyticsCard preText={props.mean.preText} val={props.mean.val}
                         postText={props.mean.postText}/>
        </Box>

        <LineChart
          sx={{margin: 0}}
          xAxis={[{
            data: props.data['seriesData']['x'],
          }]}
          series={[
            {
              data: props.data['seriesData']['y'],
            },
          ]}
          height={300}
        />
      </CardContent>
    </Card>

  )
}