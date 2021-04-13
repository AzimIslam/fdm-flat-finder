import React from "react";
import TextField from "@material-ui/core/TextField";
import './style.css';
import Typography from "@material-ui/core/Typography";
import { Button, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/Lab/Alert";


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
            openGreenBox: false,
            redBoxOpen: false,
            message: ''
        }
        this.editRequest = this.editRequest.bind(this)
        this.handleGreenClose = this.handleGreenClose.bind(this);
        this.handleRedClose = this.handleRedClose.bind(this);
    }

    handleRedClose() {
        this.setState({redBoxOpen: false})
    }

    editRequest() {
        if (this.state.agencyName == '' || this.state.firstName == '' || this.state.lastName == '' || this.state.currentPassword == '' || this.state.currentPassword == undefined) {
            this.setState({redBoxOpen: true, message: 'Please fill in the fields'})
            return;
        }
        let req = {
            agencyName: this.state.agencyName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            newPassword: this.state.newPassword,
            currentPassword: this.state.currentPassword,
            userID: sessionStorage.getItem('user_id'),
            email: this.state.email
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
            console.log(res['success'])
            if (res['success']) this.setState({openGreenBox: true})
            else this.setState({redBoxOpen: true, message: 'Invalid password'})
        })
    }

    handleGreenClose() {
        this.setState({openGreenBox: false})
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
                <Snackbar open={this.state.openGreenBox} autoHideDuration={6000} onClose={this.handleGreenClose}>
                    <Alert onClose={this.handleGreenClose} severity="success">
                        Account successfully updated
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.redBoxOpen} autoHideDuration={6000} onClose={this.handleRedClose}>
                    <Alert onClose={this.handleRedClose} severity="error">
                        {this.state.message}
                    </Alert>
                </Snackbar>
                <div id="editForm">
                <Typography variant="h4">Account Settings</Typography>
                <TextField value={this.state.agencyName} id="standard-basic" onChange={(e) => this.setState({agencyName: e.target.value})} label="Agency Name"></TextField>
                <TextField value={this.state.firstName} id="standard-basic" onChange={(e) => this.setState({firstName: e.target.value})} label="First Name"></TextField>
                <TextField value={this.state.lastName} id="standard-basic" onChange={(e) => this.setState({lastName: e.target.value})} label="Last Name"></TextField>
                <TextField disabled={true} value={this.state.email} id="standard-basic" onChange={(e) => this.setState({email: e.target.value})} label="Email"></TextField>
                <TextField type="password" value={this.state.currentPassword} id="standard-basic" onChange={(e) => this.setState({currentPassword: e.target.value})} label="Current Password"></TextField>
                <TextField type="password" value={this.state.newPassword} id="standard-basic" onChange={(e) => this.setState({newPassword: e.target.value})} label="New Password"></TextField>
                </div>
            <center>
             <Button id="editButton" onClick={() => this.editRequest()} style={{marginLeft: "10px"}} variant="contained" color="primary">Edit</Button>
            </center>
        </div>
        )
      
    }
}
