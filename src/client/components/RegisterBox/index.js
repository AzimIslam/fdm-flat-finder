import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import './style.css';

export default class RegisterBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            surname: '',
            email: '',
            username: '',
            password: '',
            isMember: true
        };
        this.toggleIsMember = this.toggleIsMember.bind(this);
        this.createRequest = this.createRequest.bind(this);
    }

    createRequest() {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open("POST", "/api/register", true);
        xhr.send(this.state)
    }

    toggleIsMember() {
        this.setState({isMember: !this.isMember});
    }
    render() {
        return(
            <form id="register-box">
                <TextField onChange={(e) => this.setState({email: e.target.value})} id="outlined-basic" label="E-mail" type="email" variant="outlined" />
                <TextField onChange={(e) => this.setState({username: e.target.value})} id="outlined-basic" label="Username"  variant="outlined" />
                <TextField onChange={(e) => this.setState({firstName: e.target.value})} id="outlined-basic" label="First Name"  variant="outlined" />
                <TextField onChange={(e) => this.setState({surname: e.target.value})} id="outlined-basic" label="Last Name" variant="outlined" />
                <TextField onChange={(e) => this.setState({password: e.target.value})} id="outlined-basic" label="Password" type="password" variant="outlined" />
                <RadioGroup aria-label="userType" name="userType">
                    <FormControlLabel value="member" onClick={this.toggleIsMember} control={<Radio />} label="Member" defaultChecked />
                    <FormControlLabel value="landlord" onClick={this.toggleIsMember} control={<Radio />} label="Landlord" />
                </RadioGroup>
                <Button onClick={this.createRequest} variant="contained" color="primary">Register</Button>
            </form>
        );
    }
}