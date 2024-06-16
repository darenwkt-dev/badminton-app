import * as React from 'react';
import {
  Box,
  Card,
  Button,
  CardContent, IconButton, Select, MenuItem,
  CardActions,
  CardActionArea,
  Radio,
  RadioGroup,
  Slider,
  Typography, Modal, List, ListItem, ListItemText, TextField, InputLabel, FormControl, OutlinedInput, InputAdornment
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import {useState, useEffect} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function CourtBookingMessage(props) {
  const [rescheduleMessage, setRescheduleMessage] = useState("");
  const [successDate, setSuccessDate] = useState(weekdays[0]);
  const [rescheduleDate, setRescheduleDate] = useState(weekdays[0]);
  const [rescheduleStartTime, setRescheduleStartTime] = useState(new Date("2022-04-17T14:00").toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }));
  const [rescheduleEndTime, setRescheduleEndTime] = useState(new Date("2022-04-17T16:00").toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }));

  function getSuccessMessage() {
    return `Booked courts for this ${successDate}! Feel free to continue signing up and invite friends!`
  }

  function handleSuccessDateChange(event) {
    console.log(event.target.value);
    setSuccessDate(event.target.value);
  }

  function getRescheduleMessage() {
    return `Booked courts for this ${rescheduleDate}! Feel free to continue signing up and invite friends!

Unfortunately, the courts are not available again, so I have booked from ${rescheduleStartTime}-${rescheduleEndTime} instead for this ${rescheduleDate} 🙏`
  }

  function handleRescheduleDateChange(event) {
    console.log(event.target.value);
    setRescheduleDate(event.target.value);
  }

  function handleStartTimeChange(event) {
    console.log(new Date(event.toString()).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}));
    setRescheduleStartTime(new Date(event.toString()).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }));
  }

  function handleEndTimeChange(event) {
    console.log(new Date(event.toString()).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}));
    setRescheduleEndTime(new Date(event.toString()).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }));
  }

  return (
    <Card sx={{m: 2, p: 2}}>
      <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
        Court Booking Confirmation
      </Typography>

      <Divider/>
      <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom sx={{mt: 2}}>
        Success Message
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Day</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={successDate}
          label="Day"
          onChange={handleSuccessDateChange}
        >
          {weekdays &&
            weekdays.map((str, ind) => <MenuItem value={str} key={ind}>{str}</MenuItem>)
          }
        </Select>
      </FormControl>
      <Card sx={{p: 2, mt: 1}}>
        <CardContent>
          {getSuccessMessage().split('\n').map((str, ind) => str.length > 0 ? <div key={ind}>{str}</div> : <br/>)}
        </CardContent>
        <CardActions>
          <Button size="small" startIcon={<ContentCopyIcon/>} onClick={() => navigator.clipboard.writeText(getSuccessMessage())}>Copy To Clipboard</Button>
        </CardActions>
      </Card>

      <Divider sx={{mt:2,mb:2}}/>
      <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom sx={{mt: 2}}>
        Reschedule Message
      </Typography>
      <Box sx={{display: "flex", justifyContent: "row"}}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Day</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rescheduleDate}
            label="Day"
            onChange={handleRescheduleDateChange}
          >
            {weekdays &&
              weekdays.map((str, ind) => <MenuItem value={str} key={ind}>{str}</MenuItem>)
            }
          </Select>

        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker defaultValue={dayjs('2022-04-17T14:00')} onChange={handleStartTimeChange} label="From"/>
          <TimePicker defaultValue={dayjs('2022-04-17T16:00')} onChange={handleEndTimeChange} label="To"/>
        </LocalizationProvider>
      </Box>
      <Card sx={{p: 2, mt: 1}}>
        <CardContent>
          {getRescheduleMessage().split('\n').map((str, ind) => str.length > 0 ? <div key={ind}>{str}</div> : <br/>)}
        </CardContent>
        <CardActions>
          <Button size="small" startIcon={<ContentCopyIcon/>} onClick={() => navigator.clipboard.writeText(getRescheduleMessage())}>Copy To Clipboard</Button>
        </CardActions>
      </Card>
    </Card>
  )
}