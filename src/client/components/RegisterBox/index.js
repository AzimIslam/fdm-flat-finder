import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import './style.css';
import ApiHandlerInstance from '../../helpers/ApiHandler';
import InputLabel from '@material-ui/core/InputLabel';

export default class RegisterBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = { //state to be sent for registering
            firstname: '',
            lastname: '',
            email: '',
            //username: '',
            password: '',
            usertype: '',
            employeeNum: null,
            agencyName: null
        };

        this.toggleFields = this.toggleFields.bind(this);
    }

    toggleFields(e) {
        this.setState({selectedRadio: e.target.value})
    }

    render() {
        return( //text and radio fields for updating state, API handler uses hash to convert 
            <form id="register-box">
                <div className="formItem">
                    <TextField  style={{width: "60%"}} onChange={(event) => this.setState({"email" : ApiHandlerInstance.hash(event.target.value)})} id="outlined-basic" label="E-mail" type="email" variant="outlined" />
                </div> 
                <div className="formItem">
                    <TextField  style={{width: "60%"}} onChange={(event) => this.setState({"firstname" : ApiHandlerInstance.hash(event.target.value)})} id="outlined-basic" label="First Name"  variant="outlined" />
                </div>
                <div className="formItem">
                    <TextField  style={{width: "60%"}} onChange={(event) => this.setState({"lastname" : ApiHandlerInstance.hash(event.target.value)})} id="outlined-basic" label="Last Name" variant="outlined" />
                </div>
                <div className="formItem">
                    <TextField  style={{width: "60%"}} onChange={(event) => this.setState({"password" : ApiHandlerInstance.hash(event.target.value)})} id="outlined-basic" label="Password" type="password" variant="outlined" />
                </div>
                <div id="radioBtns" className="formItem">
                    <InputLabel style={{marginBottom: "10px"}} htmlFor="userType">Please choose a user type</InputLabel>
                    <RadioGroup style={{width: "40%", margin: "0 auto", overflow: "auto"}} aria-label="userType" name="userType" onChange = {(event) => this.setState({"usertype" : ApiHandlerInstance.hash(event.target.value)})} >
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
                <Button onClick={this.createRequest} variant="contained" color="primary" onClick = {(event) => ApiHandlerInstance.createRequest("/api/user/register",this.state)}
                //sends state to database with register details
                >Register</Button>
                </div>
            </form>
        );
    }
}