import {Box} from "@mui/material";
import React from "react";

function Question(props) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      Question - {props.userId}: {props.questionContent}
    </Box>
  )
}

export default Question