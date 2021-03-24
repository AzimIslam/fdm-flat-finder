
import React, { Component } from 'react';
import Listing from './components/Listing'

export default class Landlord{  //single instance static class, same instance called when imported, all used for API interaction

listings = [];

constructor(agencyName, username, password, email, phoneNumber){ //listings initially a blank array, later acquired from database 
    this.agencyName = agencyName
    this.username = username
    this.password = password
    this.email = email
    this.phoneNumber = phoneNumber
    
}

removeListing(listing){ //removes listing from array of listing
//when on listings page, can select remove in boxes
//maybe a confirmation pop up?
//update display of listingsp age to have one less listing
}

createListing(){
//show page -> allow them to enter relevant data
//create a listing -> add to listing array -> stored on DBS
//update display of listings page to have new listing
}

editListing(listing){
//when on listings page, can select edit in boxes
//takes to page similar to createListing but with filled details
//save button instead of 'create listing button'
}

createSupportTicket(Ticketemail, subject, message){
//eventually..
}

getAllListings(){
    return this.listings;

}

}
