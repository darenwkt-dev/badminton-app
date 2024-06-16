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


export default function CalculatorTable() {
  const defaultCourtOccupancyLimit = 7;
  const minCourtOccupancyLimit = 4;
  const maxCourtOccupancyLimit = 12;
  const defaultCostPerPlayerLimit = 4;
  const minCostPerPlayerLimit = 0;
  const maxCostPerPlayerLimit = 12;
  const defaultMaxCourtCount = 4;
  const defaultCourtCost = 24;
  const minPlayerCount = 4;
  const maxPlayerCount = 30;

  const [rows, setRows] = useState([]);
  const [costPerPlayerLimit, setCostPerPlayerLimit] = useState(defaultCostPerPlayerLimit);
  const [courtOccupancyLimit, setCourtOccupancyLimit] = useState(defaultCourtOccupancyLimit);

  const [maxCourtCount, setMaxCourtCount] = useState(defaultMaxCourtCount);
  const [courtCost, setCourtCost] = useState(defaultCourtCost);

  const OptimisationMetric = {
    CourtOccupancy: "courtOccupancy",
    CostPerPlayer: "costPerPlayer",
    Both: "both"
  };
  const [optimisationMetric, setOptimisationMetric] = useState(OptimisationMetric.CourtOccupancy);

  function createData(playerCount, courtCount, courtOccupancy, costPerPlayer) {
    if (courtCount < 0) {
      return {
        playerCount,
        courtCount: "-",
        courtOccupancy: "-",
        costPerPlayer: "-",
        playerCountColor: "red",
        courtOccupancyColor: "red",
        costPerPlayerColor: "red"
      }
    }

    const courtOccupancyColor = courtOccupancy > courtOccupancyLimit ? "red" : "black";
    const costPerPlayerColor = costPerPlayer > costPerPlayerLimit ? "red" : "black";
    const playerCountColor = courtOccupancyColor == "red" || costPerPlayerColor == "red" ? "red" : "black";

    return {
      playerCount,
      courtCount,
      courtOccupancy,
      costPerPlayer,
      playerCountColor,
      courtOccupancyColor,
      costPerPlayerColor
    };
  }

  useEffect(() => {
    const tableData = []
    for (let playerCount = minPlayerCount; playerCount <= maxPlayerCount; playerCount++) {
      const courtCount = getCourtCountByLimit(playerCount);
      const courtOccupancy = playerCount / courtCount;
      const costPerPlayer = courtCost * courtCount / playerCount;
      tableData.push(createData(playerCount, courtCount, courtOccupancy, costPerPlayer));
    }
    setRows(tableData);
  }, [courtOccupancyLimit, costPerPlayerLimit, optimisationMetric, courtCost, maxCourtCount])

  function getCourtCountByLimit(playerCount) {
    const courtCountBasedOnOccupancyLimit = (Math.min(Math.ceil(2 * playerCount / courtOccupancyLimit) / 2, maxCourtCount));
    const courtCountBasedOnCostLimit = (Math.min(Math.floor(2 * costPerPlayerLimit * playerCount / courtCost) / 2, maxCourtCount));

    switch (optimisationMetric) {
      case OptimisationMetric.CourtOccupancy:
        return courtCountBasedOnOccupancyLimit;
      case OptimisationMetric.CostPerPlayer:
        return courtCountBasedOnCostLimit;
      case OptimisationMetric.Both:
        const courtOccupancyBasedOnOccupancyLimit = calculateCourtOccupancy(playerCount, courtCountBasedOnOccupancyLimit);
        const courtOccupancyBasedOnCostLimit = calculateCourtOccupancy(playerCount, courtCountBasedOnCostLimit);
        const costBasedOnOccupancyLimit = calculateCostPerPlayer(courtCost, playerCount, courtCountBasedOnOccupancyLimit);
        const costBasedOnCostLimit = calculateCostPerPlayer(courtCost, playerCount, courtCountBasedOnCostLimit);

        return (courtOccupancyBasedOnCostLimit > courtOccupancyLimit || courtOccupancyBasedOnOccupancyLimit > courtOccupancyLimit || costBasedOnCostLimit > costPerPlayerLimit || costBasedOnOccupancyLimit > costPerPlayerLimit) ? -1 : Math.max(courtCountBasedOnOccupancyLimit, courtCountBasedOnCostLimit);
      default:
        return Math.max(courtCountBasedOnOccupancyLimit, courtCountBasedOnCostLimit);
    }
  }

  function resetLimitToDefault() {
    setCourtOccupancyLimit(defaultCourtOccupancyLimit);
    setCostPerPlayerLimit(defaultCostPerPlayerLimit);
  }

  function resetCourtDetailsToDefault() {
    setCourtCost(defaultCourtCost);
    setMaxCourtCount(defaultMaxCourtCount);
  }

  return (
    <Card sx={{width: "auto", m: "auto", mt: 5, mb: 5, p: 0, boxShadow: 1, maxWidth: 750}} variant="outlined">
      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1}}>
          <Typography variant="h3" gutterBottom sx={{width: "fit-content", mr: "auto"}} color="primary">
            Court Booking Optimiser
          </Typography>
        <Typography variant="subtitle1" gutterBottom>
          This tool tells you how many courts to book by optimising two metrics: court occupancy and cost per player.
          Ideally, we want to play at the lowest cost while ensuring everyone have sufficient play time on the court.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Definition: Court occupancy measures how crowded a court is. I.e, court occupancy = 7 means on average 7 people will play on a court.
        </Typography>
      </Box>

      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1}}>
        <Box sx={{display: "flex"}}>
          <Typography variant="h4" gutterBottom sx={{width: "fit-content", mr: "auto"}}>
            Court Details
          </Typography>
          <IconButton color="primary" aria-label="add an alarm" sx={{mt: "auto"}} onClick={resetCourtDetailsToDefault}>
            <RestartAltIcon/>
          </IconButton>
        </Box>
        <CalculatorSlider title={"Number of available courts"} min={1} max={12}
                          step={1} value={maxCourtCount} setValue={setMaxCourtCount}/>
        <CalculatorSlider title={"Cost per court (£)"} min={10} max={30}
                          step={0.5} value={courtCost} setValue={setCourtCost}/>
      </Box>

      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1}}>
        <Box sx={{display: "flex"}}>
          <Typography variant="h4" gutterBottom sx={{width: "fit-content", mr: "auto"}}>
            Optimisation Settings
          </Typography>
          <IconButton color="primary" aria-label="add an alarm" sx={{mt: "auto"}} onClick={resetLimitToDefault}>
            <RestartAltIcon/>
          </IconButton>
        </Box>
        <CalculatorSlider title={"Max court occupancy"} min={minCourtOccupancyLimit} max={maxCourtOccupancyLimit}
                          step={0.1} value={courtOccupancyLimit} setValue={setCourtOccupancyLimit}/>
        <CalculatorSlider title={"Max cost per player (£)"} min={minCostPerPlayerLimit} max={maxCostPerPlayerLimit}
                          step={0.1} value={costPerPlayerLimit} setValue={setCostPerPlayerLimit}/>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Optimisation Metric</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="courtOccupancy"
            name="radio-buttons-group"
            onChange={(event) => setOptimisationMetric(event.target.value)
            }
          >
            <FormControlLabel value={OptimisationMetric.CourtOccupancy} control={<Radio/>} label="Court occupancy"/>
            <FormControlLabel value={OptimisationMetric.CostPerPlayer} control={<Radio/>} label="Cost per player"/>
            <FormControlLabel value={OptimisationMetric.Both} control={<Radio/>} label="Both"/>
          </RadioGroup>
        </FormControl>
      </Box>

      <TableContainer sx={{width: "auto", m: 2, p: 2, boxShadow: 1}} component={Paper}>
        <Typography variant="h4" gutterBottom sx={{width: "fit-content", mr: "auto"}}>
          Results
        </Typography>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Number of players</TableCell>
              <TableCell align="right">Number of courts</TableCell>
              <TableCell align="right">Court occupancy</TableCell>
              <TableCell align="right">Cost per player (£)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell align="center" style={{color: row.playerCountColor}}>{row.playerCount}</TableCell>
                <TableCell align="center">{row.courtCount}</TableCell>
                <TableCell align="center"
                           style={{color: row.courtOccupancyColor}}>{row.courtOccupancy > 0 ? Math.round(row.courtOccupancy * 100) / 100 : "-"}</TableCell>
                <TableCell align="center"
                           style={{color: row.costPerPlayerColor}}>{row.costPerPlayer > 0 ? Math.round(row.costPerPlayer * 100) / 100 : "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}