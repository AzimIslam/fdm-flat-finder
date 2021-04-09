import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import './style.css';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default class RegisterBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = { //state to be sent for registering
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            usertype: '',
            employeeNum: null,
            agencyName: null,
            greenBoxOpen: false,
            redBoxOpen: false,
            status: null,
            message: ''
        };

        this.toggleFields = this.toggleFields.bind(this);
        this.createRequest = this.createRequest.bind(this)
        this.handleGreenOpen = this.handleGreenOpen.bind(this);
        this.handleGreenClose = this.handleGreenClose.bind(this);
        this.handleRedOpen = this.handleRedOpen.bind(this);
        this.handleRedClose = this.handleRedClose.bind(this);
    }

    handleRedOpen() {
        this.setState({redBoxOpen: true})
    }

    handleRedClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({redBoxOpen: false})
    }

    handleGreenOpen() {
        this.setState({greenBoxOpen: true})
    }

    handleGreenClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({greenBoxOpen: false})
    }

    createRequest(){
        fetch('/api/user/register', {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: this.state.firstname, 
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                usertype: this.state.usertype,
                employeeNo: this.state.employeeNum,
                agencyName: this.state.agencyName})
        })
        .then(response => { 
            this.setState({status: response.status})
            return response.json()
        })
        .then(res => {
                if (this.state.status == 409) {
                  this.setState({message: res['message']})
                  this.handleRedOpen()
                } else if (this.state.status == 422) {
                   this.setState({message: 'Please fill in the fields'})  
                   this.handleRedOpen()
                } else {
                    this.handleGreenOpen()
                }
            } 
        )
    }

    toggleFields(e) {
        this.setState({selectedRadio: e.target.value})
    }

    render() {
        return( //text and radio fields for updating state, API handler uses hash to convert 
            <form id="register-box">
                <Snackbar open={this.state.greenBoxOpen} autoHideDuration={6000} onClose={this.handleGreenClose}>
                    <Alert onClose={this.handleGreenClose} severity="success">
                        Account successfully created
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.redBoxOpen} autoHideDuration={6000} onClose={this.handleRedClose}>
                    <Alert onClose={this.handleRedClose} severity="error">
                        {this.state.message}
                    </Alert>
                </Snackbar>
                <div className="formItem">
                    <TextField  style={{width: "60%"}} onChange={(event) => this.setState({"email" : event.target.value})} id="outlined-basic" label="E-mail" type="email" variant="outlined" />
                </div> 
                <div className="formItem">
                    <TextField  style={{width: "60%"}} onChange={(event) => this.setState({"firstname" : event.target.value})} id="outlined-basic" label="First Name"  variant="outlined" />
                </div>
                <div className="formItem">
                    <TextField  style={{width: "60%"}} onChange={(event) => this.setState({"lastname" : event.target.value})} id="outlined-basic" label="Last Name" variant="outlined" />
                </div>
                <div className="formItem">
                    <TextField  style={{width: "60%"}} onChange={(event) => this.setState({"password" : event.target.value})} id="outlined-basic" label="Password" type="password" variant="outlined" />
                </div>
                <div id="radioBtns" className="formItem">
                    <InputLabel style={{marginBottom: "10px"}} htmlFor="userType">Please choose a user type</InputLabel>
                    <RadioGroup style={{width: "40%", margin: "0 auto", overflow: "auto"}} aria-label="userType" name="userType" onChange = {(event) => this.setState({"usertype" : event.target.value})} >
                        <FormControlLabel onClick={this.toggleFields} value="member" control={<Radio />} label="Member" defaultChecked />
                        <FormControlLabel onClick={this.toggleFields}value="landlord" control={<Radio />} label="Landlord" />
                    </RadioGroup>
                </div>
                <div className="formItem">
                {
                        this.state.selectedRadio == 'member' ?  <TextField  style={{width: "60%"}} onChange={(event) => this.setState({employeeNo : event.target.value, agencyName: null})} id="outlined-basic" label="Employee Number" variant="outlined" />:
                        this.state.selectedRadio == 'landlord' ? <TextField  style={{width: "60%"}} onChange={(event) => this.setState({agencyName : event.target.value, employeeNo: null})} id="outlined-basic" label="Agency Name" variant="outlined" />:
                        false
                }
                </div>
                <div className="formItem">
                    <Button style={{width: "40%"}} className="formItem" variant="contained" color="primary" onClick={this.createRequest} 
                    //sends state to database with register details
                    >Register</Button>
                </div>
            </form>
        );
    }
}