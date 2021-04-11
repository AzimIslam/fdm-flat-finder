import React from "react";
import TextField from "@material-ui/core/TextField";
import './style.css';
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Paper from '@material-ui/core/Paper'
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class AddCreateTicketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //text box with email can't edit 
            //enter password, new password
            // first name, last name, agency name
            agencyName: '',
            firstName: '',
            lastName: '',
            currentPassword: '',
            email: '',
            newPassword: '',
            userID: sessionStorage.getItem('user_id'),
        }
        this.editRequest = this.editRequest.bind(this)
    }

    editRequest() {
        let req = {
            agencyName: this.state.agencyName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            newPassword: this.state.newPassword,
            userID: sessionStorage.getItem('user_id'),
        }

        console.log(req)
        fetch(`/api/user/editUser`, {
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


    async componentDidMount() {
        fetch('/api/user/getUserDetails', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
           body: JSON.stringify({userID: this.state.userID})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({agencyName: data['AgencyName'], firstName: data['FirstName'], lastName: data['LastName'], currentPassword: data['Password'], email: data['Email'], modalOpen: true})
        })


    }


    render() {

        return( 
            <div>
                <div id="editForm">
                <Typography variant="h4">Account Settings</Typography>
                <TextField value={this.state.agencyName} id="standard-basic" onChange={(e) => this.setState({agencyName: e.target.value})} label="Agency Name"></TextField>
                <TextField value={this.state.firstName} id="standard-basic" onChange={(e) => this.setState({firstName: e.target.value})} label="First Name"></TextField>
                <TextField value={this.state.lastName} id="standard-basic" onChange={(e) => this.setState({lastName: e.target.value})} label="Last Name"></TextField>
                <TextField disabled={true} value={this.state.email} id="standard-basic" onChange={(e) => this.setState({email: e.target.value})} label="Email"></TextField>
                <TextField value={this.state.currentPassword} id="standard-basic" onChange={(e) => this.setState({currentPassword: e.target.value})} label="Current Password"></TextField>
                <TextField value={this.state.newPassword} id="standard-basic" onChange={(e) => this.setState({newPassword: e.target.value})} label="New Password"></TextField>
                </div>
            <center>
             <Button id="editButton" onClick={() => this.editRequest()} style={{marginLeft: "10px"}} variant="contained" color="primary">Edit</Button>
            </center>
        </div>
        )
      
    }
}
