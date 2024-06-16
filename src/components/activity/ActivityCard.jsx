import * as React from 'react';
import {
  Box,
  Card,
  Button,
  CardContent, IconButton,
  CardActions,
  CardActionArea,
  Radio,
  RadioGroup,
  Slider,
  Typography, CardMedia
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import ActivityDetailsCard from "./ActivityDetailsCard";
import {useEffect, useState} from "react";

export default function ActivityCard(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true)};
  const handleClose = () => {setOpen(false)};

  return (
    <Card sx={{width: "auto", m: 0, p: 0}}>
      <CardActionArea sx={{p: 1}} onClick={handleOpen} disabled={open}>
      <CardContent sx={{display: "flex", justifyContent: "space-around", alignItems:"center"}}>
        <Typography variant="h5">{props.title}</Typography>
        <Typography variant="subtitle1">{props.date.toLocaleDateString()}</Typography>
        {props.date.getTime() < new Date().getTime() &&
          <CheckCircleOutlineIcon color="primary" sx={{float: "right"}}/>
        }
        {props.date.getTime() >= new Date().getTime() &&
          <PauseCircleOutlineIcon color="secondary" sx={{float: "right"}}/>
        }
      </CardContent>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://cdn.shopify.com/s/files/1/0449/6644/5210/files/7_blog_pic_1_480x480.png?v=1633597368"
      />
      <CardContent orientation="horizontal">
        <div>
          <Typography variant="subtitle1">Total cost: £{props.cost}</Typography>
          <Typography variant="subtitle1">Number of people: {props.details.length}</Typography>
          <Typography variant="subtitle1">Number of pending payment: {props.details.filter(item=>item['paid']===false).length}</Typography>
        </div>
      </CardContent>
      <CardActions>
        <ActivityDetailsCard open={open} handleOpen={handleOpen} handleClose={handleClose} details={props.details} date={props.date} details={props.details} cost={props.cost} venueCost={props.venueCost} otherCost={props.otherCost}/>
      </CardActions>
      </CardActionArea>
    </Card>
  );
}