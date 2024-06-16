import * as React from 'react';
import {useEffect, useState} from "react";
import {
  Box,
  Card, CardContent,
  FormControl,
  FormControlLabel,
  FormLabel, IconButton,
  Radio,
  RadioGroup,
  Slider,
  Typography
} from "@mui/material";
import OrganiseMessage from "./OrganiseMessage";
import PaymentCollection from "./PaymentCollection";
import CourtBookingMessage from "./CourtBookingMessage";
import JsonGenerator from "./JsonGenerator";

export default function CheatSheetMain(props) {
  return (
    <Box>
      <Box sx={{width: "auto", m: 2, p: 2, boxShadow: 1}}>
        <Typography variant="h3" gutterBottom sx={{width: "fit-content", mr: "auto"}} color="primary">
          CheatSheet
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Generate messages in an instance 🤯
        </Typography>
      </Box>

      <OrganiseMessage/>
      <PaymentCollection/>
      <CourtBookingMessage/>
      <JsonGenerator/>
    </Box>
  )
}