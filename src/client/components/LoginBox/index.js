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
            email: '',
            password: '',
            showMessage: ''
        }
        this.loginRequest = this.loginRequest.bind(this)
    }

    loginRequest() {
        fetch(`/api/user/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(res => {
            this.setState({showMessage : res.message})
            console.log(res)
        })
    }

    render() {
        return (
            <div id="container">
            {
                this.state.showMessage != '' ? <p>{this.state.showMessage}</p>
                : <form id="login-box">
                    <div className="formItem">
                        <TextField style={{width: "60%"}} className="formItem" id="outlined-basic" label="Email" type="email" variant="outlined" //textfields for updating state, API handler uses hash to convert 
                        onChange = {(event) => this.setState({"email" : event.target.value})}/><br/>
                    </div>

                    <div className="formItem">
                        <TextField style={{width: "60%"}} className="formItem" id="outlined-basic" label="Password" type="password" variant="outlined" 
                        onChange = {(event) => this.setState({"password" : ApiHandlerInstance.hash(event.target.value)})}/><br/> 
                    </div>

                    <div className="formItem">
                        <Button style={{width: "40%"}} className="formItem" variant="contained" color="primary" onClick = {this.loginRequest} 
                        //sends state to database with login details
                        >Login </Button> 
                    </div>
                </form>
            }
            </div>
        )
    }

}
