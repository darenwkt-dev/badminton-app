import * as React from 'react';
import {
  Box,
  Card,
  Button,
  CardContent, IconButton,
  CardActions,
  CardActionArea,
  Radio,
  RadioGroup,
  Slider,
  Typography, Modal, List, ListItem, ListItemText, Autocomplete, TextField, CardHeader, Stack
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import Divider from "@mui/material/Divider";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import {useState, useEffect} from "react";
import OrganiseMessage from "../cheatsheet/OrganiseMessage";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

export default function ActivityCreationCard(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <Button onClick={handleOpen}>Create new Activity</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <OrganiseMessage />
        </Box>
      </Modal>
    </div>
  )
}