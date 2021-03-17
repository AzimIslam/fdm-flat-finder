import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';
//import dataStreamHandler

export default class LoginBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: ' ',
            password: ' '
            }
        }
    
    render() {
        return (
            <form id="login-box">
                <TextField id="outlined-basic" label="E-mail" type="email" variant="outlined"
                onChange = {(event) => this.handleInput("email", event.target.value)}/><br/>
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined"
                onChange = {(event) => this.handleInput("password", event.target.value)}/><br/>
                <Button variant="contained" color="primary" onClick = {(event) => this.submitData(event)} >Login </Button>
                
            </form>
        )
    }
    handleInput(name ,value){ //use an interface to enforce implementation of these methods for LoginBox and RegisterBox -> Proxy Design Pattern 
        var parameter = {label: name, val: value}  
        this.setState(parameter)  
    }

    submitData(event){
        alert(this.state.email + "," + this.state.password)
    }
    setState(property){
        this.state[property.label] = property.val
    }

}
