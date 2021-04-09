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
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography'


function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper style={{minWidth: "600px"}} {...props} />
      </Draggable>
    );
  }


//requires landlord class
//gets listings from this class -> instance based on session?
export default class ListingsBox extends React.Component {

    constructor(props){
        super(props); //maybe used to take data from front-page, i.e. landlord instance from user var

        this.state = { //state to be sent for logging in
            landlord: sessionStorage.getItem('user_id'), //this gets updated from database -> instance based on session -> front page should load the user instance based on login info
            listings: [],
            greenBoxOpen: false,
            modalOpen: false,
            fileName: 'No file selected'
        }

        this.deleteListing = this.deleteListing.bind(this);
        this.handleGreenClose = this.handleGreenClose.bind(this);
        this.handleGreenOpen = this.handleGreenOpen.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.selectFile = this.selectFile.bind(this);
    }

    selectFile(event) {
        let file = event.target.files[0];
        this.setState({fileName: file.name})
    }

    closeModal() {
        this.setState({modalOpen: false})
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
            <Dialog
                open={this.state.modalOpen}
                onClose={this.closeModal}
                PaperComponent={PaperComponent}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Edit Listing
                </DialogTitle>
                <DialogContent>
                <div id="form">
                    <TextField id="standard-basic" onChange={(e) => this.setState({address1: e.target.value})} label="Address Line 1"></TextField>
                    <TextField id="standard-basic" onChange={(e) => this.setState({address2: e.target.value})} label="Address Line 2"></TextField>
                    <TextField id="standard-basic" onChange={(e) => this.setState({city: e.target.value})} label="City"></TextField>
                    <TextField id="standard-basic" onChange={(e) => this.setState({county: e.target.value})} label="County"></TextField>
                    <TextField id="standard-basic" onChange={(e) => this.setState({postcode: e.target.value})} label="Postcode"></TextField>
                    <TextField id="standard-basic" onChange={(e) => this.setState({country: e.target.value})} label="Country"></TextField>
                    <TextField id="standard-basic" type="number" label="Rent Per Month" onChange={(e) => this.setState({rent: e.target.value})}/>
                    <div id="file-upload">
                        <div style={{ width: '100%'}}>
                            <Typography style={{color: 'rgba(0, 0, 0, 0.54)'}}>Image Upload</Typography>
                            <input type="file" id="contained-button-file" accept="image/*" style={{ display: 'none' }} onChange={this.selectFile}/>
                            <label htmlFor="contained-button-file">
                                <Button style={{display: 'inline-block'}} variant="contained" color="primary" component="span">
                                    Upload
                                </Button>
                            </label>
                        </div>
                        <Typography style={{display: 'inline-block'}}>{this.state.fileName}</Typography>
                    </div>
                </div>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={this.closeModal} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.submitTicket} color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
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
                            <Button onClick={() => this.setState({modalOpen: true})} style={{marginLeft: "10px"}} variant="contained" color="primary">Edit</Button>
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
