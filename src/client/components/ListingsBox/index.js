import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';
import ApiHandlerInstance from '../../helpers/ApiHandler';


//requires landlord class
//gets listings from this class -> instance based on session?
export default class LoginBox extends React.Component  {
    constructor(props){
        super(props); //maybe used to take data from front-page, i.e. landlord instance from user var

        this.state = { //state to be sent for logging in
            // username: ' '
            
            
            landlord: None, //this gets updated from database -> instance based on session -> front page should load the user instance based on login info

            //could remove?? and use landlord var
            //listings: [] //listing array taken from the data-base -> maybe users can each have listing array stored -> in landlord as variable???, etc. 
        }

        this.ApiHandler = new ApiHandler(); //API handler for database handling!

        }
    
    testMethod(){
        this.state.landlord = new Landlord(agencyName = "you", username = "can", password ="do", email ="it@gmail.com", phoneNumber = 12344)
        listings = this.state.landlord.getListings();  
        listings[0] = new Listing(title = "hello", address1 = "ayyy", address2 = "good luck",city = "with this",county = "you", postcode = "12can", landlord = this.state.landlord, rent = 50){

    }
    
    render() {
        listings = landlord.getListings()
        const listingItems = listings.map((listings) => <li key={listing.title}>    <listing></listing> </li>);
        return ( //requires landlord -> require gathering of listing array from database and updating to database, need some dynamic way of having listings boxes in a 'table' each with edit, view, delete option
        //edit, delete, create must use parameters of listing to create a json and use the APIHandler to send data to DBS -> new database section for listings -> must be organised/grouped with users
            <form id="listings-box"> 

                <listingItems></listingItems>

                <Button variant="contained" color="primary" onClick = {(event) => landlord.createListing()} >CreateListing </Button> 
                
            </form>
        )
    }

 

}
