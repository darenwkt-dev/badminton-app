import {Card, CardContent, Typography} from "@mui/material";
import * as React from 'react';
import {useEffect, useState} from "react";

export default function AnalyticsCard(props) {
  return (
    <Card sx={{margin: 1, padding: 1}}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{textAlign: "center"}}>
          {props.preText}
          <Typography variant="h2" component="div">
            {props.val}
          </Typography>
          {props.postText}
        </Typography>
      </CardContent>
    </Card>
  )
}