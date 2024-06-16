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

export default function JsonGenerator(props) {
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
  const [message, setMessage] = useState("");
  const [participants, setParticipants] = useState("");

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

  function handleParticipantChange(event, newValue) {
    console.log(newValue);
    setParticipants(newValue);
  }

  function getNextSunday() {
    let t = new Date();
    t.setDate(t.getDate() + (7 - t.getDay())%7);
    return t;
  }

  useEffect(() => {
    generateMessage();
  }, [date, startTime, endTime, participants])

  function generateMessage() {
    const participantsList = participants.split(",");

    const data = []
    for (let i in participantsList) {
      let participant = participantsList[i].toLowerCase();
      data.push(
        {
          "activityDetailsId": "33157914-dfbc-40c2-bff7-4c778513e7d4",
          "activityId": date.getTime(),
          "groupId": "testId",
          "playerName": participant,
          "paid": true,
          "createdAt": 1697078536356
        }
      )
    }
    setMessage(data);
  }

  return (
    <Card sx={{m:2, p:2}}>
        <Stack spacing={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Activity Creation
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker defaultValue={dayjs(getNextSunday().toISOString())} onChange={handleDateChange} label="Date"/>
          </LocalizationProvider>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={[]}
            defaultValue={"Daren"}
            renderInput={(params) => <TextField {...params} label="Participants"/>}
            onChange={handleParticipantChange}
          />
        </Stack>
        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom sx={{mt:2}}>
          Generated JSON
        </Typography>
        <Card sx={{p: 2, mt:1}}>
          <CardContent>
            {JSON.stringify(message)}
          </CardContent>
          <CardActions>
            <Button size="small" startIcon={<ContentCopyIcon/>} onClick={() => navigator.clipboard.writeText(message)}>Copy To Clipboard</Button>
          </CardActions>
        </Card>
    </Card>
  )
}