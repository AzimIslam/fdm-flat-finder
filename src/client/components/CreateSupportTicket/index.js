import React from "react";
import TextField from "@material-ui/core/TextField";
import './style.css';
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

export default class AddCreateTicketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            userID: '0',
        }
        this.submitRequest = this.submitRequest.bind(this)
    }

    submitRequest() {
        let req = {
            title: this.state.title,
            description: this.state.description,
            userID: sessionStorage.getItem('user_id'),
        }

        console.log(req)
        fetch(`/api/user/createSupportTicket`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
        })
    }


    render() {
        return <form className="listingForm" onSubmit={e => {console.log(e)}}>
            <Typography id="listingTitle" variant="h4">Create Support Ticket</Typography>
            <TextField id="standard-basic" onChange={(e) => this.setState({title: e.target.value})} label="Title"></TextField>
            <TextField id="standard-basic" onChange={(e) => this.setState({description: e.target.value})} label="Description"></TextField>
            <Button variant="contained" color="primary" onClick={this.submitRequest} style={{marginTop: '10px'}}>Submit Ticket</Button>
        </form>
    }
}