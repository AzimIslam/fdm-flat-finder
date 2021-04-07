import React, { Component } from 'react';
/*import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
<<<<<<< HEAD
import Paper from '@material-ui/core/Paper' */
import clsx from 'clsx';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Landlord from '../../users/Landlord';
import Listing from '../../helpers/Listing';
import { makeStyles } from '@material-ui/core/styles';
=======
import Paper from '@material-ui/core/Paper'
import './style.css'
import { Button } from '@material-ui/core';
>>>>>>> 0bf1b518c8bd27ecc0f36abf42371fa12215765e


//requires landlord class
//gets listings from this class -> instance based on session?
export default class ListingsBox extends React.Component {

    constructor(props){
        super(props); //maybe used to take data from front-page, i.e. landlord instance from user var

        this.state = { //state to be sent for logging in
            landlord: sessionStorage.getItem('user_id'), //this gets updated from database -> instance based on session -> front page should load the user instance based on login info
<<<<<<< HEAD

            //could remove?? and use landlord var
            listings: null, //listing array taken from the data-base -> maybe users can each have listing array stored -> in landlord as variable???, etc. 
            landlord_data: null
=======
            listings: []
>>>>>>> 0bf1b518c8bd27ecc0f36abf42371fa12215765e
        }
    }

<<<<<<< HEAD
        this.state.landlord_data = new Landlord("you", "can","do","it@gmail.com",12344)
        this.state.listings = this.state.landlord_data.getAllListings();  
        this.state.listings[0] = new Listing(0,"hello","ayyy","good luck","with this","you","12can",this.state.landlord,50);
        this.state.listings[1] = new Listing(1,"hello2","ayyy","good luck","with this","you","12can",this.state.landlord,50);
        this.state.listings[2] = new Listing(2,"hello3","ayyy","good luck","with this","you","12can",this.state.landlord,50);

        this.state.listings[3] = new Listing(3,"hello4","ayyy","good luck","with this","you","12can",this.state.landlord,50);

        this.state.listings[4] = new Listing(4,"hello5","ayyy","good luck","with this","you","12can",this.state.landlord,50);

        this.state.listings[5] = new Listing(5,"hello6","ayyy","good luck","with this","you","12can",this.state.landlord,50);

        this.state.listings[6] = new Listing(6,"hello7","ayyy","good luck","with this","you","12can",this.state.landlord,50);

        this.state.listings[7] = new Listing(7,"hello8","ayyy","good luck","with this","you","12can",this.state.landlord,50);

        this.state.listings[8] = new Listing(8,"hello9","ayyy","good luck","with this","you","12can",this.state.landlord,50);

        this.state.listings[9] = new Listing(9,"hello10","ayyy","good luck","with this","you","12can",this.state.landlord,50);

        this.state.listings[10] = new Listing(10,"hello11","ayyy","good luck","with this","you","12can",this.state.landlord,50);

        this.state.listings[11] = new Listing(11,"hello12","ayyy","good luck","with this","you","12can",this.state.landlord,50);

        this.state.listings[12] = new Listing(12,"hello13","ayyy","good luck","with this","you","12can",this.state.landlord,50);


        //this.ApiHandler = ApiHandlerInstance; //API handler for database handling!
        
        }
=======
>>>>>>> 0bf1b518c8bd27ecc0f36abf42371fa12215765e
    componentDidMount() {
        fetch(`/api/user/getAllListings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({UserID: this.state.landlord})
        })
        .then(response => response.json())
<<<<<<< HEAD
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
        
=======
        .then(data => {
            console.log(data)
            this.setState({listings: data});
        })
    } 
    
    render() {
        return (
        <TableContainer component={Paper}>
        <Table id="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Address Line 1</TableCell>
              <TableCell align="left">Address Line 2</TableCell>
              <TableCell align="left">City</TableCell>
              <TableCell align="left">County</TableCell>
              <TableCell align="left">Postcode</TableCell>
              <TableCell align="left">Country</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Rent Per Month (£)</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.listings.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.AddressLine1}</TableCell>
                <TableCell align="left">{row.AddressLine2}</TableCell>
                <TableCell align="left">{row.City}</TableCell>
                <TableCell align="left">{row.County}</TableCell>
                <TableCell align="left">{row.Postcode}</TableCell>
                <TableCell align="left">{row.Country}</TableCell>
                <TableCell align="left">{row.IsRoom == 1 ? "Room": "Flat"}</TableCell>
                <TableCell align="left">{row.RentPerMonth}</TableCell>
                <TableCell align="left" style={{overflow: 'none'}}>
                    <div className="buttons">
                        <Button variant="contained" color="primary">View</Button>
                        <Button style={{marginLeft: "10px"}} variant="contained" color="primary">Edit</Button>
                        <Button style={{marginLeft: "10px"}} variant="contained" color="primary">Delete</Button>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        );
>>>>>>> 0bf1b518c8bd27ecc0f36abf42371fa12215765e
    }

 

}
