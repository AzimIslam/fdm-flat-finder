import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Redirect} from 'react-router-dom';
import './style.css';
import ApiHandlerInstance from '../../helpers/ApiHandler';

export default class ModifyListingBox extends React.Component  {
    constructor(props){
        super(props);
        this.state = { //state to be sent for listingbox, must be generalisable! 
            // username: ' '

        }
        this.loginModify; //= this.'fill in metohd name'.bind(this)
    }

    /*
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
            if (res['success']) {
                sessionStorage.setItem('loggedIn', true);
                sessionStorage.setItem('user_id', res['user_id'])
                sessionStorage.setItem('userType', res['userType'])
            }

            if (res['userType'] == 'landlord') window.location = '/landlord';
            else console.log("Unidentified user");
        })
    }
*/ 
    render() {
        return (
            <div id="container">
            {
                this.state.showMessage != '' ? <p>{this.state.showMessage}</p> //textfield for every field in Listing
                //should use another map method!
                : <form id="modify-listing-box">


                    <div className="formItem">
                        <TextField style={{width: "60%"}} className="formItem" id="outlined-basic" label="Email" type="email" variant="outlined" //textfields for updating state, API handler uses hash to convert 
                        onChange = {(event) => this.setState({"email" : event.target.value})}/><br/>
                    </div>

                    <div className="formItem">
                        <TextField style={{width: "60%"}} className="formItem" id="outlined-basic" label="Password" type="password" variant="outlined" 
                        onChange = {(event) => this.setState({"password" : ApiHandlerInstance.hash(event.target.value)})}/><br/> 
                    </div>


                    {//single button for submitting all data
    }
                    <div className="formItem">
                        <Button style={{width: "40%"}} className="formItem" variant="contained" color="primary" onClick = {this.modifyRequest} 
                        //creates OR edits data
                        >Confirm </Button> 
                    </div>
                </form>
            }
            </div>
        )
    }

}
