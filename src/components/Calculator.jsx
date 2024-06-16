import {Button, Box, TextField, Grid, Slider, Input, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import CalculatorTable from "./CalculatorTable";
import SimpleCalculator from "./SimpleCalculator";

function Calculator() {

  return (
    <Box
    >
      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1}}>
        <Typography variant="h3" gutterBottom sx={{width: "fit-content", mr: "auto"}} color="primary">
          Calculator
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          For the Big Brains 🧠
        </Typography>
      </Box>
      <CalculatorTable/>
      <SimpleCalculator/>
    </Box>
  )
}

export default Calculator