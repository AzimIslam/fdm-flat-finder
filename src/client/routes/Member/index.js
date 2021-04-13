import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './style.css';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SupportIcon from "@material-ui/icons/ContactSupport";
import IconButton from "@material-ui/core/IconButton";
import Listing from "../../components/Listing/";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper style={{minWidth: "600px"}} {...props} />
      </Draggable>
    );
}

export default class Member extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: sessionStorage.getItem('user_id'),
            city: null,
            maxRent: null,
            county: null,
            room: false,
            flat: false,
            cheapest: false,
            country: null,
            listings: [],
            text: 'Featured Listings',
            modalOpen: false,
            greenBoxOpen: false,
            title: '',
            description: '',
            redBoxOpen: false
        }


        this.handleRoomChange = this.handleRoomChange.bind(this)
        this.handleFlatChange = this.handleFlatChange.bind(this)
        this.handleCheapestChange = this.handleCheapestChange.bind(this)
        this.filteredSearch = this.filteredSearch.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.submitTicket = this.submitTicket.bind(this)
        this.handleGreenClose = this.handleGreenClose.bind(this)
        this.handleRedClose = this.handleRedClose.bind(this)
    }

    handleRedClose() {
        this.setState({redBoxOpen: false})
    }

    handleGreenClose() {
        this.setState({greenBoxOpen: false})
    }

    openModal() {
        this.setState({modalOpen: true})
    }

    closeModal () {
        this.setState({modalOpen: false})
    }

    handleRoomChange(event) {
        this.setState({room: !this.state.room})
    }

    handleFlatChange(event) {
        this.setState({flat: !this.state.flat})
    }

    handleCheapestChange(event) {
        this.setState({cheapest: !this.state.cheapest})
    }

    logout() {
        sessionStorage.clear()
        window.location = "/"
    }

    async componentDidMount() {
        await fetch(`/api/user/getAllListingsFromSystem`)
            .then(response => response.json())
            .then(data => {
                this.setState({listings: data})
            });

        console.log(this.state.listings)
    }

    async submitTicket() {
        let req = {
            title: this.state.title,
            description: this.state.description,
            userID: sessionStorage.getItem('user_id'),
        }

        if (req.title == '' || req.description == '') {
            this.setState({redBoxOpen: true})
            return;
        }

        console.log(this.state.title)

        fetch(`/api/user/createSupportTicket`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        .then(response => response.json())
        .then(res => {
            this.setState({greenBoxOpen: true})
        })
    }

    async filteredSearch() {
        let req = {
            maxRent: this.state.maxRent,
            city: this.state.city,
            county: this.state.county,
            country: this.state.country,
            isRoom: this.state.room,
            isFlat: this.state.flat,
            sortByCheapest: this.state.cheapest
        }

        console.log(req)

        await fetch(`/api/user/applySearchFilter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        .then(res => res.json())
        .then(data => this.setState({listings: data}));

        if (this.state.listings.length == 0) this.setState({text: "No listings found"})
        else this.setState({text: "Search Results"})
    }

    render() {
        return (
            <div id="container">
            <Snackbar open={this.state.greenBoxOpen} autoHideDuration={6000} onClose={this.handleGreenClose}>
                <Alert onClose={this.handleGreenClose} severity="success">
                    Your support ticket has been submitted to our team!
                </Alert>
            </Snackbar>

            <Snackbar open={this.state.redBoxOpen} autoHideDuration={6000} onClose={this.handleRedClose}>
                    <Alert onClose={this.handleRedClose} severity="error">
                        Please fill in the fields
                    </Alert>
            </Snackbar>

            <Dialog
                open={this.state.modalOpen}
                onClose={this.closeModal}
                PaperComponent={PaperComponent}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Create Support Ticket
                </DialogTitle>
                <DialogContent>
                <div id="form">
                    <div className="form-item">
                        <TextField onChange={(e) => this.setState({title: e.target.value})} className="formItem" id="outlined-basic" label="Subject" type="text" variant="outlined" />
                    </div>
                    <div className="form-item">
                        <TextField style={{width: '100%'}} onChange={(e) => this.setState({description: e.target.value})}id="outlined-multiline-static" label="Message" multiline rows={6} variant="outlined"/>
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
                <div id="header">
                    <Button id="logoutBtn" variant="contained" color="primary" onClick={this.logout}>Logout</Button> 
                    <IconButton onClick={this.openModal} style={{ fontSize: 30, float: "right" }}>
                        <SupportIcon style={{ marginTop: "-5px", marginRight: "10px"}} />
                    </IconButton>
                    <div id="search">
                        <Typography variant="h4" style={{fontWeight: "bolder"}}>Search for a listing</Typography>
                        <div id="textboxes">
                            <div className="field">
                                <TextField onChange={(e) => this.setState({rent: e.target.value})} id="standard-basic" type="number" label="Max Rent" onChange={(e) => this.setState({maxRent: e.target.value})}/>
                            </div>
                            <div className="field">
                                <TextField onChange={(e) => this.setState({country: e.target.value})}id="standard-basic" label="Country" />
                            </div>
                            <div className="field">
                                <TextField onChange={(e) => this.setState({city: e.target.value})} id="standard-basic" label="City" />
                            </div>
                            <div className="field">
                                <TextField onChange={(e) => this.setState({county: e.target.value})} id="standard-basic" label="County" />
                            </div>
                        </div>
                        <FormControlLabel control={<Checkbox checked={this.state.room} onChange={this.handleRoomChange} name="room" />} label="Room"/>
                        <FormControlLabel control={<Checkbox checked={this.state.flat} onChange={this.handleFlatChange} name="flat" />} label="Flat"/>
                        <FormControlLabel control={<Checkbox checked={this.state.cheap} onChange={this.handleCheapestChange} name="cheapest" />} label="Sort By Cheapest"/>                
                        <Button onClick={this.filteredSearch} id="searchBtn" variant="contained" color="primary">Search for Listing </Button> 
                    </div>
                </div>
                <Typography style={{paddingBottom: "20px"}} id="featuredTitle" variant="h4">
                    {this.state.text}
                </Typography>
                <div id="listings">
                {
                    this.state.listings.map((listing) => {
                        return(
                            <Listing style={{display: 'inline-block'}} id={listing.ListingID} rent={listing.rent} isRoom={listing.IsRoom} address={listing.AddressLine1} city={listing.City} postcode={listing.Postcode} country={listing.Country} rent={listing.RentPerMonth} email={listing.Email} agency={listing.AgencyName} />
                        )
                    })
                }
                </div>

            </div>
        )
    }
}