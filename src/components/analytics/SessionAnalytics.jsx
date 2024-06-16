import {Box, Typography} from "@mui/material";
import * as React from 'react';
import {useEffect, useState} from "react";
import AnalyticsStatsCard from "./AnalyticsStatsCard";

export default function SessionAnalytics(props) {
  return (
    <Box sx={{width: "auto", mt: 2, mb: 2, p: 2, boxShadow: 0}}>
      <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
        At every session,
      </Typography>
      <AnalyticsStatsCard title={'Session Cost'} data={props.analyticsData['costPerSession']}
                          min={{
                            preText: "Cheapest session costs",
                            val: `£ ${Math.round(props.analyticsData['costPerSession']['min'] * 100.0) / 100.0}`,
                            postText: ""
                          }}
                          max={{
                            preText: "Priciest session costs",
                            val: `£ ${Math.round(props.analyticsData['costPerSession']['max'] * 100.0) / 100.0}`,
                            postText: ""
                          }}
                          mean={{
                            preText: "Average session costs",
                            val: `£ ${Math.round(props.analyticsData['costPerSession']['mean'] * 100.0) / 100.0}`,
                            postText: ""
                          }}
      />
      <AnalyticsStatsCard title={'Individual Cost'} data={props.analyticsData['costPerPerson']}
                          min={{
                            preText: "Cheapest per person",
                            val: `£ ${Math.round(props.analyticsData['costPerPerson']['min'] * 100.0) / 100.0}`,
                            postText: ""
                          }}
                          max={{
                            preText: "Priciest per person",
                            val: `£ ${Math.round(props.analyticsData['costPerPerson']['max'] * 100.0) / 100.0}`,
                            postText: ""
                          }}
                          mean={{
                            preText: "Average cost per person",
                            val: `£ ${Math.round(props.analyticsData['costPerPerson']['mean'] * 100.0) / 100.0}`,
                            postText: ""
                          }}
      />
      <AnalyticsStatsCard title={'Attendance'} data={props.analyticsData['attendancePerSession']}
                          min={{
                            preText: "Smallest session had",
                            val: `${Math.round(props.analyticsData['attendancePerSession']['min'])}`,
                            postText: "people"
                          }}
                          max={{
                            preText: "Biggest session had",
                            val: `${Math.round(props.analyticsData['attendancePerSession']['max'])}`,
                            postText: "people"
                          }}
                          mean={{
                            preText: "Average session had",
                            val: `${Math.round(props.analyticsData['attendancePerSession']['mean'])}`,
                            postText: "people"
                          }}
      />
    </Box>
  )
}