
import React, { Component } from 'react';
import './style.css';
import Button from '@material-ui/core/Button';
export default class Listing extends React.Component{ //must be stored in a list, must be rendered in a listing using keys on ListingBox 
    

    address1;
    address2;
    city;
    country;
    county;
    postcode;
    landlord;
    isRoom;
    rent;
    title;
    constructor(props, title, address1, address2,city,county, postcode, landlord, rent){
        super(props);

        this.title = title //extra??

        this.address1 = address1
        this.address2 = address2
        this.city = city
        this.county = county
        this.country = country
        this.postcode = postcode
        this.landlord = landlord //must find a way of loading this
        this.isRoom = isRoom
    }


    render(){
        console.log(this.title);
        return(
            <form id="listing"> 
                <textarea value = {this.title}></textarea> 
                <Button variant="contained" color="primary" onClick = {(event) => this.editListingDetails()}> Edit Listing </Button> 
                <Button variant="contained" color="primary" onClick = {(event) => this.showListingDetails()}> View Listing </Button> 
                <Button variant="contained" color="primary" onClick = {(event) => this.deleteListing()}> Delete Listing </Button> 
                <Button variant="contained" color="primary" onClick = {(event) => this.deleteListing()}> Create Listing </Button> 
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

        fetch(`/api/user/address`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(req => {
            this.setState({
                address1: req.address.AddressLine1,
                address2: req.address.AddressLine2,
                county: req.address.County,
                city: req.address.City,
                country: req.address.Country,
                postcode: req.address.Postcode,
                isRoom: req.address.IsRoom,

            })
    
            address.map(row => 
                <div classname='row' >
                    {
                        row.map(col => 
                            <div className='column'>
                                { col }
                            </div>)    
                    }
                </div>)
              

            renderRow = () => {
                return this.state.address.map(function (val, i){
                    return (
                        <tr>
                            <td key={i}>
                                {val.address1},
                                {val.address2},
                                {val.county},
                                {val.city},
                                {val.country},
                                {val.postcode},
                                {val.isRoom},
                            </td>    
                        </tr>
                    )
                }) 
            }

            address.map()

        }
    )
        
        

        

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