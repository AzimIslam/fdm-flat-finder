import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import './style.css';

export default class LLSupportTicket extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<div className="container">
            <Typography id="supportTicketTitle" variant="h4">Create a Support Ticket</Typography>
            <div id="form">
                <div className="form-item">
                    <TextField style={{width: "40%"}} className="formItem" id="outlined-basic" label="Contact Email" type="email" variant="outlined" //textfields for updating state, API handler uses hash to convert 
        onChange = {(event) => this.setState({"email" : event.target.value})}/>
                </div>
                <div className="form-item">
                    <TextField style={{width: "40%"}} className="formItem" id="outlined-basic" label="Subject" type="text" variant="outlined" //textfields for updating state, API handler uses hash to convert 
        onChange = {(event) => this.setState({"email" : event.target.value})}/>
            </div>
            <div className="form-item">
                <TextField id="outlined-multiline-static" style={{width: '40%'}} label="Message" multiline rows={6} variant="outlined"/>
            </div>
            <div className="form-item">
            <Button style={{width: "40%"}} className="form-item" variant="contained" color="primary" onClick = {this.loginRequest}> Submit </Button>
            </div> 
         </div>
        </div>)

    }
}