import * as React from 'react';
import {useEffect, useState} from "react";
import {
  Autocomplete,
  Box, Button,
  Card, CardActions, CardContent,
  FormControl,
  FormControlLabel,
  FormLabel, IconButton,
  Radio,
  RadioGroup,
  Slider, Stack, TextField,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";


const organisers = ["Daren", "Nick", "Charlotte,Lloyd", "Jia"];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function OrganiseMessage(props) {
  const [date, setDate] = useState(getNextSunday());
  const [startTime, setStartTime] = useState(new Date("2022-04-17T14:00").toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }));
  const [endTime, setEndTime] = useState(new Date("2022-04-17T16:00").toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }));
  const [organiser, setOrganiser] = useState("Daren");
  const [message, setMessage] = useState("");

  function handleDateChange(event) {
    console.log(new Date(event.toString()).getTime());
    setDate(new Date(event.toString()));
  }

  function handleStartTimeChange(event) {
    console.log(new Date(event.toString()).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}));
    setStartTime(new Date(event.toString()).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }));
  }

  function handleEndTimeChange(event) {
    console.log(new Date(event.toString()).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}));
    setEndTime(new Date(event.toString()).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}));
  }

  function handleOrganiserChange(event, newValue) {
    console.log(newValue);
    setOrganiser(newValue);
  }

  function getNextSunday() {
    let t = new Date();
    t.setDate(t.getDate() + (7 - t.getDay())%7);
    return t;
  }

  useEffect(() => {
    generateMessage();
  }, [date, startTime, endTime, organiser])

  function generateMessage() {
    const organisers = organiser.split(",");

    const messageTemplate = `Hi all, we are playing again on ${weekdays[date.getDay()]} (${date.toLocaleDateString()}), ${startTime}-${endTime} at Chesterton Sports Centre! Please put your name below to help with court booking! 🏸 

1. ${organisers[0]}
2. ${organisers[1] ? organisers[1] : ''}
3. 
4. 
5. 
6. 
7. 
8. 
9. 
10. 
11. 
12. 
13. 
14. 
15. 
16.
`
    setMessage(messageTemplate);
  }

  return (
    <Card sx={{m:2, p:2}}>
        <Stack spacing={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Activity Creation
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker defaultValue={dayjs(getNextSunday().toISOString())} onChange={handleDateChange} label="Date"/>
            <TimePicker defaultValue={dayjs('2022-04-17T14:00')} onChange={handleStartTimeChange} label="From"/>
            <TimePicker defaultValue={dayjs('2022-04-17T16:00')} onChange={handleEndTimeChange} label="To"/>
          </LocalizationProvider>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={organisers}
            defaultValue={"Daren"}
            renderInput={(params) => <TextField {...params} label="Organiser"/>}
            onChange={handleOrganiserChange}
          />
        </Stack>
        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom sx={{mt:2}}>
          Generated Message
        </Typography>
        <Card sx={{p: 2, mt:1}}>
          <CardContent>
            {message.split('\n').map((str, ind) => str.length >0 ? <div key={ind}>{str}</div>: <br/>)}
          </CardContent>
          <CardActions>
            <Button size="small" startIcon={<ContentCopyIcon/>} onClick={() => navigator.clipboard.writeText(message)}>Copy To Clipboard</Button>
          </CardActions>
        </Card>
    </Card>
  )
}