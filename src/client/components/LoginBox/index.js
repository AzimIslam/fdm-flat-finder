import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';



export default class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {  }

    }
    makeRequest(){
        fetch("/api/register", {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message:"hello"
            })
        }).then(
            response => response.json() 
        ).then(
            res => console.log(res)
        )

        //const xhr = new XMLHttpRequest();
        //xhr.open("POST", "/api/register", true);
        //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        //xhr.onload = () => {
            //console.log(this.responseText);
        //}
        //xhr.send({message:"hello"})
    }
    render() {
        return (
            <form id="login-box">
                <TextField id="outlined-basic" label="E-mail" type="email" variant="outlined" />
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" />
                <Button variant="contained" color="primary" onClick={this.makeRequest}>Login</Button>
            </form>
        )
    }
}
