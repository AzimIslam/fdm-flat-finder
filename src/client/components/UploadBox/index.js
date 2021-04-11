import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';

import {Redirect} from 'react-router-dom';
import './style.css';
//import ApiHandlerInstance from '../../helpers/ApiHandler';

export default class UploadBox extends React.Component  {
    constructor(props){
        super(props);
        this.state = { 
            selectedFile: null
        }
        this.onFileSelect = this.onFileSelect.bind(this)
        this.onFileUpload = this.onFileUpload.bind(this)
    }

    
    onFileSelect(event) {
        this.state.selectedFile = fileEvent.target.files[0]
    }
    
   
    onFileUpload() {
        console.log(this.state.selectedFile)
        //take data from selectedFile in state and send

        /* 
        fetch(`/api/'[Wherever it goes]'`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: //must find way of taking necessary data
        })
        .then(response => response.json())
        .then(res => {
            if (res['success']) {
                //sessionStorage updates some stuff on listings ????
            }

            
        })
     */
    }

    render() {
        return (
            <div id="container">
            
              
                <input type = "file" onChange = {this.onFileSelect}></input>
                <button onClick = {this.onFileUpload}></button>    
                
            
            </div>
        )
    }

}
