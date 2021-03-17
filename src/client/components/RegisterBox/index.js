import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import './style.css';
import ApiHandlerInstance from '../../helpers/ApiHandler';

export default class RegisterBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = { //state to be sent for registering
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            usertype: ' '
        };

       
    }

    render() {
        return( //text and radio fields for updating state, API handler uses hash to convert 
            <form id="register-box"> 
                <TextField onChange={(event) => this.setState({"email" : ApiHandlerInstance.hash(event.target.value)})} id="outlined-basic" label="E-mail" type="email" variant="outlined" />
                <TextField onChange={(event) => this.setState({"username" : ApiHandlerInstance.hash(event.target.value)})} id="outlined-basic" label="Username"  variant="outlined" />
                <TextField onChange={(event) => this.setState({"firstname" : ApiHandlerInstance.hash(event.target.value)})} id="outlined-basic" label="First Name"  variant="outlined" />
                <TextField onChange={(event) => this.setState({"lastname" : ApiHandlerInstance.hash(event.target.value)})} id="outlined-basic" label="Last Name" variant="outlined" />
                <TextField onChange={(event) => this.setState({"password" : ApiHandlerInstance.hash(event.target.value)})} id="outlined-basic" label="Password" type="password" variant="outlined" />
                <RadioGroup aria-label="userType" name="userType" onChange = {(event) => this.setState({"usertype" : ApiHandlerInstance.hash(event.target.value)})} >
                    <FormControlLabel value="member" control={<Radio />} label="Member" defaultChecked />
                    <FormControlLabel value="landlord" control={<Radio />} label="Landlord" />
                </RadioGroup>
                <Button onClick={this.createRequest} variant="contained" color="primary" onClick = {(event) => ApiHandlerInstance.updateDataBase("/api/register",this.state)}
                //sends state to database with register details
                >Register</Button>
            </form>
        );
    }
}