import React from "react";
import TextField from "@material-ui/core/TextField";
import './style.css';
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

export default class AddCreateTicketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //text box with email can't edit 
            //enter password, new password
            // first name, last name, agency name
            agencyName: '',
            email: '',
            firstName: '',
            lastName: '',
            currentPassword: '',
            newPassword: '',
            userID: '0',
        }
        this.submitRequest = this.submitRequest.bind(this)
    }

    submitRequest() {
        let req = {
            agencyName: this.state.agencyName,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            currentPassword: this.state.currentPassword,
            newPassword: this.state.newPassword,
            userID: sessionStorage.getItem('user_id'),
        }

        //needs to be changed with the fecth alfie made
        console.log(req)
        fetch(`/api/user/createSupportTicket`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({UserID: this.state.landlord})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({listings: data})
        })
    }


    render() {
        return <form className="AccountForm" onSubmit={e=> {console.log(e)}}>
            <Typography id="AccountTitle" variant="h4">Account Settings</Typography>
            <TextField id="standard-basic" onChange={(e) => this.setState({agencyName: e.target.value})} label="agency"></TextField>
            <TextField id="standard-basic" onChange={(e) => this.setState({firstName: e.target.value})} label="firstName"></TextField>
            <TextField id="standard-basic" onChange={(e) => this.setState({lastName: e.target.value})} label="lastName"></TextField>
            <TextField id="standard-basic" onChange={(e) => this.setState({email: e.target.value})} label="email" readonly></TextField>
            <TextField id="standard-basic" onChange={(e) => this.setState({currentPassword: e.target.value})} label="currentPassword"></TextField>
            <TextField id="standard-basic" onChange={(e) => this.setState({newPassword: e.target.value})} label="newPassword"></TextField>
            <Button variant="contained" color="primary" onClick={this.submitRequest} style={{marginTop: '10px'}}>Make Changes</Button>
        </form>
    }
}