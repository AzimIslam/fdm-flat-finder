import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
//import './style.css';
import ApiHandlerInstance from '../../helpers/ApiHandler';
import Landlord from '../../users/Landlord'
import Listing from '../../helpers/Listing'


//requires landlord class
//gets listings from this class -> instance based on session?
export default class ListingsBox extends React.Component  {
    constructor(props){
        super(props); //maybe used to take data from front-page, i.e. landlord instance from user var

        this.state = { //state to be sent for logging in
            // username: ' '
            
            
            landlord: null //this gets updated from database -> instance based on session -> front page should load the user instance based on login info

            //could remove?? and use landlord var
            //listings: [] //listing array taken from the data-base -> maybe users can each have listing array stored -> in landlord as variable???, etc. 
        }

        this.ApiHandler = ApiHandlerInstance; //API handler for database handling!

        }
    
    testMethod(){
        this.state.landlord = new Landlord("you", "can","do","it@gmail.com",12344)
        var listings = this.state.landlord.getAllListings();  
        listings[0] = new Listing("hello","ayyy","good luck","with this","you","12can",this.state.landlord,50);
        listings[1] = new Listing("hello2","ayyy","good luck","with this","you","12can",this.state.landlord,50);

    }
    
   
    renderListings = () => {
        this.testMethod();
        var listings = this.state.landlord.getAllListings()
        return listings.map((listing) => {
            return (
                <Listing key = {listing}></Listing> //might need a unique id for key?
            )


        })
    }

    render() {
       
        return ( //requires landlord -> require gathering of listing array from database and updating to database, need some dynamic way of having listings boxes in a 'table' each with edit, view, delete option
        //edit, delete, create must use parameters of listing to create a json and use the APIHandler to send data to DBS -> new database section for listings -> must be organised/grouped with users
            
            <form id="listings-box"> 
   
                
                {this.renderListings()}
                <Button variant="contained" color="primary" onClick = {(event) => landlord.createListing()} >CreateListing </Button> 
                
            </form>
        )
    }

 

}
