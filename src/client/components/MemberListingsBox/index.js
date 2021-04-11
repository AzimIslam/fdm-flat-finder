import React, { Component } from 'react';
/*import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper' */
import clsx from 'clsx';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Listing from '../../helpers/Listing';
import { makeStyles } from '@material-ui/core/styles';


//requires landlord class
//gets listings from this class -> instance based on session?
export default class MemberListingsBox extends React.Component {

    constructor(props){
        super(props); //maybe used to take data from front-page, i.e. landlord instance from user var

        this.state = { //state to be sent for logging in
            // username: ' '
            
            


            //could remove?? and use landlord var
            listings: null, //listing array taken from the data-base -> maybe users can each have listing array stored -> in landlord as variable???, etc. 

        }

        //this.ApiHandler = ApiHandlerInstance; //API handler for database handling!
        
        }
    componentDidMount() {
        fetch(`/api/user/getAllListings`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
            
        })
        .then(response => response.json())
        .then(res => {
           console.log(res)

           this.setState({listings: res})
           
        });
    }
    
 

    createListings(res) { //modify to create Listing?
        arr = res.map((listingformat) => (
            Listing(res.val)

        ))
        //let listing;
        //if(isRoom == 1) listing = "Room";
        //else listing = "Flat"
        //return { id, title, address1, address2, city, county, postcode, country, listing};
        
    }
    
   
    

    render() {
        
        return(
            <GridList cellHeight={150} className= 'grid-list' cols={3}>
            {this.state.listings.map((listing) => (
            <GridListTile key={listing.state.id} cols={2 || 1}>
    
                
    
               <Listing component = {listing}> </Listing>
               

            </GridListTile>
            ))}
        </GridList>
        )


        
    }

 

}
