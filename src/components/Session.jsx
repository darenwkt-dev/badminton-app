import { Button, Box, TextField } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import Question from "./Question";

function Session() {
  const [queryParameters] = useSearchParams()
  const [sessionId, setSessionId] = useState(queryParameters.get("sessionId"))
  const [questions, setQuestions] = useState([])
  const baseURL = "http://localhost:8080/api/v1"

  useEffect(() => {
    axios.get(`${baseURL}/questions?sessionId=${sessionId}`).then((response) => {
      console.log(JSON.stringify(response));
      const data = response.data;
      if (data && data.length > 0) {
        setQuestions(response.data)
      }
    });
  }, [])

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      HELLO SESSION {sessionId}
      {questions && questions.map(
        ({questionContent, userId}) => {
          return <Question questionContent={questionContent} userId={userId}/>
      })}
    </Box>
  )
}

export default Session