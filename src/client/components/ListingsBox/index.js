import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import './style.css'
import { Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'

//requires landlord class
//gets listings from this class -> instance based on session?
export default class ListingsBox extends React.Component {

    constructor(props){
        super(props); //maybe used to take data from front-page, i.e. landlord instance from user var

        this.state = { //state to be sent for logging in
            landlord: sessionStorage.getItem('user_id'), //this gets updated from database -> instance based on session -> front page should load the user instance based on login info
            listings: [],
            greenBoxOpen: false
        }

        this.deleteListing = this.deleteListing.bind(this);
        this.handleGreenClose = this.handleGreenClose.bind(this);
        this.handleGreenOpen = this.handleGreenOpen.bind(this);
    }

    handleGreenClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({greenBoxOpen: false})
    }


    componentDidMount() {
        fetch(`/api/user/getAllListings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({UserID: this.state.landlord})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({listings: data});
        });
        
    }
    
    handleGreenOpen() {
        this.setState({greenBoxOpen: true})
    }

    deleteListing(id) {
        fetch(`/api/user/deleteListing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ListingID: id})
        })
        .then(response => response.json())
        .then(data => {
            if (data['success'] == true) {
                console.log("Deleted")
            }
        });

        fetch(`/api/user/getAllListings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({UserID: this.state.landlord})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({listings: data});
        });

        this.handleGreenOpen();
    }
    
    render() {
        return (
        <div>
            <Snackbar open={this.state.greenBoxOpen} autoHideDuration={6000} onClose={this.handleGreenClose}>
                    <Alert onClose={this.handleGreenClose} severity="success">
                        Listing successfully deleted
                    </Alert>
                </Snackbar>
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
                <TableRow key={row.ListingID}>
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
                            <Button onClick={() => this.deleteListing(row.ListingID)} style={{marginLeft: "10px"}} variant="contained" color="primary">Delete</Button>
                        </div>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
      </div>
        );
    }

 

}
