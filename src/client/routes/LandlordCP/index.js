import React, {Component} from "react";
import './style.css';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/typography";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import 'fontsource-roboto';
import LandlordHomePage from "../../components/LandlordHomePage";
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { List, ListItem } from "material-ui";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Landlord extends React.Component {
    constructor() {
        super()
        this.state = {
            loggedIn: sessionStorage.getItem('loggedIn'),
            userType: sessionStorage.getItem('userType'),
            userId: sessionStorage.getItem('user_id'),
            fullName: '',
            toggle: false,
            viewListing: true,
            addListing: false,
            support: false,
            accountSettings: false
        }

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.toggleViewListing = this.toggleViewListing.bind(this);
        this.toggleAddListing = this.toggleAddListing.bind(this);
        this.toggleSupport = this.toggleSupport.bind(this);
        this.toggleAccountSettings = this.toggleAccountSettings.bind(this);
    }

    logout() {
        sessionStorage.clear();
        window.location = '/';
    }

    toggleDrawer(bool) {
        this.setState({toggle: bool})
    }

    toggleViewListing() {
        this.setState({viewListing: true, addListing: false, support: false, accountSettings: false})
        this.toggleDrawer(false)
    }

    toggleAddListing() {
        this.setState({addListing: true, viewListing: false, support: false, accountSettings: false})
        this.toggleDrawer(false)
    }

    toggleSupport() {
        this.setState({support: true, viewListing: false, addListing: false, accountSettings: false})
        this.toggleDrawer(false)
    }

    toggleAccountSettings() {
        this.setState({accountSettings: true, viewListing: false, addListing: false, support: false})
        this.toggleDrawer(false)
    }

    componentDidMount() {
        fetch(`/api/user/getName`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({UserID: this.state.userId})
        })
        .then(response => response.json())
        .then(data => this.setState({fullName: data.text}))
    }

    list() {
        return (
            <List style={{width: 250}}>
                <ListItem onClick={this.toggleViewListing}>View Listings</ListItem>
                <ListItem onClick={this.toggleAddListing}>Add a Listing</ListItem>
                <ListItem onClick={this.toggleSupport}>Create a Support Ticket</ListItem>
                <ListItem onClick={this.toggleAccountSettings}>Account Settings</ListItem>
            </List>
        )
    }

    render() {
        return (
            <MuiThemeProvider>
                {
                    this.state.userType != 'landlord'? <p>You are not a landlord</p>:
                    this.state.loggedIn != 'true' ? <p>You are not logged in</p>:
                    <div>
                    <Toolbar style={{backgroundColor: "#3f51b5"}} variant="dense">
                        <IconButton onClick={() => this.toggleDrawer(true)} style={{color: "white"}} edge="start" color="inherit" aria-label="open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography style={{fontWeight: "lighter", color: "white"}}variant="h6">
                            Landlord Control Panel
                        </Typography>

                        <div className="userTools">
                            <Button variant="contained" color="secondary" onClick={this.logout}>Logout</Button>
                        </div>

                    </Toolbar>
                        <Drawer anchor={'left'} open={this.state.toggle} onClose={() => this.toggleDrawer(false)}>
                            {this.list()}
                        </Drawer>
                    </div>
                }
            </MuiThemeProvider>
        )
    }
}