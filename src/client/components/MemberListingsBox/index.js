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
import Landlord from '../../users/Landlord';
import Listing from '../../helpers/Listing';
import { makeStyles } from '@material-ui/core/styles';


//requires landlord class
//gets listings from this class -> instance based on session?
export default class ListingsBox extends React.Component {

    constructor(props){
        super(props); //maybe used to take data from front-page, i.e. landlord instance from user var

        this.state = { //state to be sent for logging in
            // username: ' '
            
            
            landlord: sessionStorage.getItem('user_id'), //this gets updated from database -> instance based on session -> front page should load the user instance based on login info

            //could remove?? and use landlord var
            listings: null, //listing array taken from the data-base -> maybe users can each have listing array stored -> in landlord as variable???, etc. 
            landlord_data: null
        }

        //this.ApiHandler = ApiHandlerInstance; //API handler for database handling!
        
        }
    componentDidMount() {
        fetch(`/api/user/getAllListings`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({UserID: this.state.landlord})
        })
        .then(response => response.json())
        .then(res => {
           console.log(res)
           //this.setState({listings: this.state.landlord.getAllListings()})
           
        });
    }
    
 

    createData(id, title, address1, address2, city, county, postcode, country, isRoom) {
        let listing;
        if(isRoom == 1) listing = "Room";
        else listing = "Flat"
        return { id, title, address1, address2, city, county, postcode, country, listing};
    }
    
   
    

    render() {
        
        return(
            <GridList cellHeight={150} className= 'grid-list' cols={3}>
            {this.state.listings.map((listing) => (
            <GridListTile key={listing.state.id} cols={2 || 1}>
    }
                
    }
               <Listing component = {listing}> </Listing>
               

               

            </GridListTile>
            ))}
        </GridList>
        )

        /*
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Address Line 1</TableCell>
                <TableCell align="right">Address Line 2</TableCell>
                <TableCell align="right">County</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Postcode</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">Listing Type</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.listings.map((row) => (
                <TableRow key={row.ListingID}>
                    <TableCell component="th" scope="row">
                    {row.ListingID}
                    </TableCell>
                    <TableCell align="right">{row.AddressLine1}</TableCell>
                    <TableCell align="right">{row.AddressLine2}</TableCell>
                    <TableCell align="right">{row.City}</TableCell>
                    <TableCell align="right">{row.County}</TableCell>
                    <TableCell align="right">{row.Postcode}</TableCell>
                    <TableCell align="right">{row.Country}</TableCell>
                    <TableCell align="right">{row.IsRoom == 1 ? "Room": "Flat"}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer> */
        
    }

 

}
