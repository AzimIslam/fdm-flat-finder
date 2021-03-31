
import React, { Component } from 'react';
import './style.css';
import Button from '@material-ui/core/Button';
export default class Listing extends React.Component{ //must be stored in a list, must be rendered in a listing using keys on ListingBox 
    

    address1;
    address2;
    city;
    county;
    postcode;
    landlord;
    rent;
    title;
    constructor(props, title, address1, address2,city,county, postcode, landlord, rent){
        super(props);

        this.title = title //extra??

        this.address1 = address1
        this.address2 = address2
        this.city = city
        this.county = county
        this.postcode = postcode
        this.landlord = landlord //must find a way of loading this
    }


    render(){
        console.log(this.title);
        return(
            <form id="listing"> 
                <textarea value = {this.title}></textarea> 
                <Button variant="contained" color="primary" onClick = {(event) => this.editListingDetails()}> Edit Listing </Button> 
                <Button variant="contained" color="primary" onClick = {(event) => this.showListingDetails()}> View Listing </Button> 
                <Button variant="contained" color="primary" onClick = {(event) => this.deleteListing()}> Delete Listing </Button> 
            </form>

        ) 

    }

    editListingDetails(){

        //POPUP or Page to enter data
        //if page -> must use props or other to get data from that page to here
        //POPUP or nothing -> confirmation
        //update listing data from that

        var listingdata;
        //create json of all parameters apart from landlord -> this is always loaded in from session
        //listing data is json

        
        //ApiHandlerInstance.createRequest("/api/'some name???' ",listingdata)
    }

    //createListing method will be in ListingBox -> must add to the Listing array

    deleteListingDetails(){
        //popup or nothing -> confirmation
        //delete entry in database 

        //ApiHandlerInstance.createRequest("/api/'some name???' ",listingdata)
    }

    showListingDetails(){ //directly displays 
        //create Json??

        //POPUP or Page to show data from json?
        

        /*
        details = "address 1: "+this.address1 //generalise -> use loop or have another method that creates string to allow for inheritance and extra features.
                +"address 2: "+this.address2
                +"city: "+this.city
                +"county: "+this.county
                +"postcode: "+this.postcode
                //constant factors
                +"agency: "+this.landlord.agencyName
                +"landlord username: "+this.landlord.username
                +"email: "+this.landlord.email
                +"phone number:"+this.landlord.phoneNumber
        return details
        */

    
    }
}
