import {Box, Slider, Typography} from "@mui/material";
import * as React from 'react';

export default function CalculatorSlider(props) {
  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

  return (
    <Box>
      <Typography id="linear-slider" gutterBottom>
        {props.title}: {props.value}
      </Typography>
      <Slider
        value={props.value}
        min={props.min}
        step={props.step}
        max={props.max}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="linear-slider"
      />
    </Box>
  )
}