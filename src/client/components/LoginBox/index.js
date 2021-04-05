import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import './style.css';

export default class LoginBox extends React.Component  {
    constructor(props){
        super(props);
        this.state = { //state to be sent for logging in
            // username: ' '
            email: '',
            password: '',
            showMessage: '',
            open: false
        }
        this.loginRequest = this.loginRequest.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClick() {
        this.setState({open: true})
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false})
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
            console.log(res)
            if (res['success']) {
                sessionStorage.setItem('loggedIn', true);
                sessionStorage.setItem('user_id', res['user_id'])
                sessionStorage.setItem('userType', res['userType'])
                if (res['userType'] == 'landlord') window.location = '/landlord';
            } else {
                this.handleClick()
            }
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
                        onChange = {(event) => this.setState({"password" : event.target.value})}/><br/> 
                    </div>

                    <div className="formItem">
                        <Button style={{width: "40%"}} className="formItem" variant="contained" color="primary" onClick = {this.loginRequest} 
                        //sends state to database with login details
                        >Login </Button> 
                    </div>
                    <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity="error">
                            Incorrect e-mail and password
                        </Alert>
                    </Snackbar>
                </form>
            }
            </div>
        )
    }

}
