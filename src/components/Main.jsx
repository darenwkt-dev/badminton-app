import * as React from 'react';
import {useEffect, useState} from "react";
import dayjs from 'dayjs';

import {
  Box,
  Card, CardContent,
  Badge,
  FormControl,
  FormControlLabel,
  FormLabel, IconButton,
  Radio,
  RadioGroup, Avatar,
  Slider, Grid,
  Typography, CardActionArea, CardMedia
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
import {useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CalculateIcon from '@mui/icons-material/Calculate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MessageIcon from '@mui/icons-material/Message';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../logo.svg';
import logo1 from '../images/logo1.jpeg';

export default function Main(props) {
  const navigate = useNavigate();


  return (
    <Card sx={{width: "auto", m: "auto", mt: 5, mb: 5, p: 0, boxShadow: 1, maxWidth: 1250}} variant="outlined">

      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1, display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap:"wrap"}}>
        <Avatar
          sx={{width: 200, height: 200, m: 5}}
          src={logo1}
        />
        <Box sx={{m: 5, p: 2}}>
          <Typography variant="h3" gutterBottom sx={{width: "fit-content", textAlign: "center"}} color="primary">
            Sports Master
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{width: "fit-content", textAlign: "center"}}>
            Organise your sports activities in one-place
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}} sx={{p: 2}}>
        <Grid item xs={4} sm={4} md={4}>
          <FeatureCard icon={<CalendarMonthIcon color={"primary"}/>} title={"Activity"}
                       description={"Manages all activities organised in the future & past. 🗓️"}
                       handleNavigate={() => navigate("/activity")}/>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <FeatureCard icon={<AnalyticsIcon color={"primary"}/>} title={"Analytics"}
                       description={"Analytics to track weekly attendance, cost, pending payments, etc. 🙃"}
                       handleNavigate={() => navigate("/analytics")}/>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <FeatureCard icon={<MessageIcon color={"primary"}/>} title={"CheatSheet"}
                       description={"CheatSheet to quickly generate messages. 🤯"}
                       handleNavigate={() => navigate("/cheatsheet")}/>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <FeatureCard icon={<CalculateIcon color={"primary"}/>} title={"Calculator"}
                       description={"Smart calculator to optimise venue size. 🧠"}
                       handleNavigate={() => navigate("/calculator")}/>
        </Grid>
      </Grid>
    </Card>
  );
}

function FeatureCard(props) {
  return (
    <Card>
      <CardActionArea onClick={props.handleNavigate}>
        <CardContent>
          <Box sx={{display: "flex", justifyContent: "left", alignItems: "center", m: 1}}>
            {props.icon}
            <Typography variant="h5" component="div" sx={{m: 2}}>
              {props.title}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}