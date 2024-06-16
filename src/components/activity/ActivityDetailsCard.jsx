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

export default function ActivityDetailsCard(props) {
  const [cost, setCost] = useState(0);
  const [message, setMessage] = useState("");
  const [rawMessage, setRawMessage] = useState("");

  function handleMessageChange(event) {
    // console.log(event.target.value);
    setRawMessage(event.target.value);
  }

  useEffect(() => {
    const regexp = /\d*\.(.*)/g;
    const names = [...rawMessage.matchAll(regexp)].map((name)=>name[1].toLowerCase().trim());
    console.log(names)

    const costPerPerson = Math.round(cost/names.length*100)/100;

    let messageTemplate = `Hi all, thanks for coming today! Hope everyone had fun and got some exercise in! 💦

Badminton today was £${costPerPerson} per person, thank you!!

Name: Daren Wong Kien Ting
Bank: Monzo Bank
Account number: 56017225
Sort code: 04-00-04

https://monzo.me/darenkientingwong/${costPerPerson}?d=Badminton  
`

    for (let i = 0; i < names.length; i++) {
      messageTemplate += `\n${i+1}. ${names[i][0].toUpperCase() + names[i].slice(1)}`;
    }
    console.log(messageTemplate)
    setMessage(messageTemplate);
  }, [cost, rawMessage])

  function handleCostChange(event) {
    console.log(event.target.value)
    setCost(event.target.value);
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton onClick={props.handleClose} sx={{float:"right"}} aria-label="close" color="primary">
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Activity Details
          </Typography>
          <Typography variant="subtitle1">Date: {props.date.toLocaleDateString()}</Typography>
          <Typography variant="subtitle1">Total Cost: £{props.cost} (Venue: £{props.venueCost}, Others:
            £{props.otherCost})</Typography>
          <Typography variant="subtitle1">Number of people: {props.details.length}</Typography>
          <Typography variant="subtitle1">Number of pending
            payment: {props.details.filter(item => item['paid'] === false).length}</Typography>

          <Divider sx={{mt: 2, mb: 2}}/>

          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Players + Payment Status
          </Typography>
          <List>
            {props.details &&
              props.details.map((key, index) => (
                <ListItem disablePadding key={index}>
                  <ListItemText primary={key['playerName']}/>
                  {key['paid'] === true &&
                    <CheckCircleOutlineIcon color={"primary"}/>
                  }
                  {key['paid'] === false &&
                    <PauseCircleOutlineIcon color={"secondary"}/>
                  }
                </ListItem>
              ))
            }
          </List>

          <Divider sx={{mt: 2, mb: 2}}/>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Update data from message
          </Typography>

          <TextField label={"paste message here"} onChange={handleMessageChange} multiline rows={10} sx={{width:"100%"}}></TextField>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Cost</InputLabel>
            <OutlinedInput
              type="number"
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">£</InputAdornment>}
              label="Cost"
              onChange={handleCostChange}
            />
          </FormControl>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom sx={{mt:2}}>
            Generated Payment Message
          </Typography>
          <Card sx={{p: 2, mt:1}}>
            <CardContent>
              {message.split('\n').map((str,ind) => <div key={ind}>{str}</div>)}
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigator.clipboard.writeText(message)}>Copy To Clipboard</Button>
            </CardActions>
          </Card>
          <Button>Update Data From Message</Button>
        </Box>
      </Modal>
    </div>
  )
}