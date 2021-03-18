import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';
import ApiHandlerInstance from '../../helpers/ApiHandler';

export default class LoginBox extends React.Component  {
    constructor(props){
        super(props);
        this.state = { //state to be sent for logging in
            // username: ' '
            email: ' ',
            password: ' '
            }

        }
    
    render() {
        return (
            <form id="login-box">
                <TextField id="outlined-basic" label="Email" type="email" variant="outlined" //textfields for updating state, API handler uses hash to convert 
                onChange = {(event) => this.setState({"email" : event.target.value})}/><br/>
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" 
                onChange = {(event) => this.setState({"password" : ApiHandlerInstance.hash(event.target.value)})}/><br/> 
                <Button variant="contained" color="primary" onClick = {(event) => ApiHandlerInstance.createRequest("/api/login",this.state)} 
                //sends state to database with login details
                >Login </Button> 
                
            </form>
        )
    }

}
