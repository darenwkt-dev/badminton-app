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
  Typography, Modal, List, ListItem, ListItemText, TextField, InputLabel, FormControl, OutlinedInput, InputAdornment
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import {useState, useEffect} from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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
  overflow: "scroll"
};

export default function PaymentCollection(props) {
  const [cost, setCost] = useState(24);
  const [message, setMessage] = useState("");
  const [rawMessage, setRawMessage] = useState("");

  function handleMessageChange(event) {
    // console.log(event.target.value);
    setRawMessage(event.target.value);
  }

  useEffect(() => {
    try {
      const regexp = /\d*\.(.*)/g;
      const names = [...rawMessage.matchAll(regexp)].map((name) => name.length > 0 && name[1] ? name[1].toLowerCase().trim() : "").filter((name)=>name.length>0);

      const costPerPerson = Math.round(cost / names.length * 100) / 100;

      let messageTemplate = `Hi all, thanks for coming today! Hope everyone had fun and got some exercise in! 💦

Badminton today was £${costPerPerson} per person, thank you!!

Name: Daren Wong Kien Ting
Bank: Monzo Bank
Account number: 56017225
Sort code: 04-00-04

https://monzo.me/darenkientingwong/${costPerPerson}?d=Badminton  
`

      for (let i = 0; i < names.length; i++) {
        messageTemplate += `\n${i + 1}. ${names[i][0].toUpperCase() + names[i].slice(1)}`;
      }
      console.log(messageTemplate)
      setMessage(messageTemplate);
    } catch (e) {
      console.log("failed to process payment message", e);
    }
  }, [cost, rawMessage])

  function handleCostChange(event) {
    console.log(event.target.value)
    setCost(Math.max(0, new Number(event.target.value)));
  }

  return (
    <Card sx={{m: 2, p: 2}}>
      <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
        Payment Collection
      </Typography>

      <TextField label={"paste message here"} onChange={handleMessageChange} multiline rows={10}
                 sx={{width: "100%"}}></TextField>
      <FormControl fullWidth sx={{mt: 2}}>
        <InputLabel htmlFor="outlined-adornment-amount">Cost</InputLabel>
        <OutlinedInput
          type="number"
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">£</InputAdornment>}
          label="Cost"
          onChange={handleCostChange}
          value={cost}
        />
      </FormControl>
      <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom sx={{mt: 2}}>
        Generated Payment Message
      </Typography>
      <Card sx={{p: 2, mt: 1}}>
        <CardContent>
          {message.split('\n').map((str, ind) => str.length >0 ? <div key={ind}>{str}</div>: <br/>)}
        </CardContent>
        <CardActions>
          <Button size="small" startIcon={<ContentCopyIcon/>} onClick={() => navigator.clipboard.writeText(message)}>Copy To Clipboard</Button>
        </CardActions>
      </Card>
    </Card>
  )
}