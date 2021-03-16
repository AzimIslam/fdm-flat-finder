import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

export default class LoginBox extends React.Component {
    render() {
        return (
            <form id="login-box">
                <TextField id="outlined-basic" label="E-mail" type="email" variant="outlined" />
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" />
                <Button variant="contained" color="primary">Login</Button>
            </form>
        )
    }
}
