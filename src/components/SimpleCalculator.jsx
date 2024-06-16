import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel, IconButton,
  Radio,
  RadioGroup,
  Slider,
  Typography
} from "@mui/material";
import {calculateCostPerPlayer, calculateCourtOccupancy} from "../utils/CalculatorUtil";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CalculatorSlider from "./CalculatorSlider";

export default function SimpleCalculator(props) {
  const defaultCourtCount = 2;
  const defaultCourtCost = 24;
  const defaultPlayerCount = 14;

  const [playerCount, setPlayerCount] = useState(defaultPlayerCount);
  const [courtCount, setCourtCount] = useState(defaultCourtCount);
  const [courtCost, setCourtCost] = useState(defaultCourtCost);
  const [costPerPlayer, setCostPerPlayer] = useState(0);
  const [courtOccupancy, setCourtOccupancy] = useState(0);

  useEffect(() => {
    setCostPerPlayer(Math.round(calculateCostPerPlayer(courtCost, playerCount, courtCount)*100)/100);
    setCourtOccupancy(Math.round(calculateCourtOccupancy(playerCount, courtCount)*100/100));

  }, [playerCount, courtCount, courtCost])

  function resetParamToDefault() {
    setPlayerCount(defaultPlayerCount);
    setCourtCount(defaultCourtCount);
    setCourtCost(defaultCourtCost);
  }

  return (
    <Card sx={{width: "fit-content", m: "auto", mt: 5, mb: 5, p: 0, boxShadow: 1, maxWidth: 750}} variant="outlined">
      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1}}>
        <Typography variant="h3" gutterBottom sx={{width: "fit-content", mr: "auto"}} color="primary">
          Simple Calculator
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          This tool calculates the cost per player, court occupancy based on the given number of players and courts.
        </Typography>
      </Box>

      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1}}>
        <Box sx={{display: "flex"}}>
          <Typography variant="h4" gutterBottom sx={{width: "fit-content", mr: "auto"}}>
            Court Details
          </Typography>
          <IconButton color="primary" aria-label="add an alarm" sx={{mt: "auto"}} onClick={resetParamToDefault}>
            <RestartAltIcon/>
          </IconButton>
        </Box>
        <CalculatorSlider title={"Number of courts"} min={1} max={12}
                          step={1} value={courtCount} setValue={setCourtCount}/>
        <CalculatorSlider title={"Number of players"} min={4} max={30}
                          step={1} value={playerCount} setValue={setPlayerCount}/>
        <CalculatorSlider title={"Cost per court (£)"} min={10} max={30}
                          step={0.5} value={courtCost} setValue={setCourtCost}/>
      </Box>
      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1}}>
        <Typography variant="h4" gutterBottom sx={{width: "fit-content", mr: "auto"}}>
          Results
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{width: "fit-content", mr: "auto"}}>
          Cost per player (£): {costPerPlayer}
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{width: "fit-content", mr: "auto"}}>
          Court occupancy: {courtOccupancy}
        </Typography>
      </Box>
    </Card>
  );
}