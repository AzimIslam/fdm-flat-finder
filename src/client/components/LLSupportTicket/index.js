import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Snackbar from  "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import './style.css';

export default class LLSupportTicket extends React.Component {
    constructor() {
        super();
        this.state = {
            greenBoxOpen: false,
            title: '',
            description: '',
        }
        this.submitTicket = this.submitTicket.bind(this)
        this.handleGreenClose = this.handleGreenClose.bind(this)
    }

    handleGreenClose() {
        this.setState({greenBoxOpen: false})
    }

    submitTicket() {
        let req = {
            title: this.state.title,
            description: this.state.description,
            userID: sessionStorage.getItem('user_id'),
        }

        console.log(this.state.title)

        fetch(`/api/user/createSupportTicket`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        .then(response => response.json())
        .then(res => {
            this.setState({greenBoxOpen: true})
        })
    }

    render() {
        return (
        <div className="container">
            <Snackbar open={this.state.greenBoxOpen} autoHideDuration={6000} onClose={this.handleGreenClose}>
                <Alert onClose={this.handleGreenClose} severity="success">
                    Your support ticket has been submitted to our team!
                </Alert>
            </Snackbar>
            <Typography id="supportTicketTitle" variant="h4">Create a Support Ticket</Typography>
            <div id="form">
                <div className="form-item">
                    <TextField onChange={(e) => this.setState({title: e.target.value})} style={{width: "40%"}} className="formItem" id="outlined-basic" label="Subject" type="text" variant="outlined" />
                </div>
            <div className="form-item">
                <TextField onChange={(e) => this.setState({description: e.target.value})}id="outlined-multiline-static" style={{width: '40%'}} label="Message" multiline rows={6} variant="outlined"/>
            </div>
            <div className="form-item">
            <Button style={{width: "40%"}} className="form-item" variant="contained" color="primary" onClick = {this.submitTicket}> Submit </Button>
            </div> 
         </div>
        </div>)

    }
}