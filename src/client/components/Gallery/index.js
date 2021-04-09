import React, { Component } from 'react';
/*import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper' */
import clsx from 'clsx';


//requires landlord class
//gets listings from this class -> instance based on session?
export default class Gallery extends React.Component {

    constructor(props){
        super(props); //maybe used to take data from front-page, i.e. landlord instance from user var

        this.state = { //state to be sent for logging in
            // username: ' '
            
            


            //could remove?? and use landlord var
            imgSrc = []

        }

        //this.ApiHandler = ApiHandlerInstance; //API handler for database handling!
        
        }
    
    
 

    expandImage(img){
        var expandedImg = document.getElementById("bigImageContainer");
        //sets bigImage to image passed in
        //not quite dynamic
        expandedImg.src = this.img.src;
        expandedImg.parentElement.style.display = "block";
    }
    
    render() {
        
        return(
            //need a map to img src to img components
        )
    }

 

}
