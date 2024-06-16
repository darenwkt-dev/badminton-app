import { Button, Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function SessionLogin() {
  const [sessionId, setSessionId] = useState(null);
  const navigate = useNavigate();
  const baseURL = "http://localhost:8080/api/v1";

  const enterSession = () => {
    console.log("enter sessionId: "+JSON.stringify(sessionId))
    axios.get(`${baseURL}/session?sessionId=${sessionId}`).then((response) => {
      console.log(JSON.stringify(response));
      const data = response.data;
      if (data && 'sessionId' in data) {
        navigate(`/session?sessionId=${sessionId}`);
      }
    });
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Standard" variant="standard" onChange={(event) => setSessionId(event.target.value)}/>
      <Button onClick={enterSession}>Enter</Button>
    </Box>
  )
}

export default SessionLogin