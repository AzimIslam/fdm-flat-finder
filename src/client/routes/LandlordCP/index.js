import React, {Component} from "react";
import './style.css';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/typography";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import 'fontsource-roboto';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { List, ListItem } from "material-ui";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import AddListingForm from "../../components/AddListingForm";
import ListingsBox from "../../components/ListingsBox";
import AdminSupportTicket from "../../components/AdminSupportTicket";

export default class Landlord extends React.Component {
    constructor() {
        super()
        this.state = {
            loggedIn: sessionStorage.getItem('loggedIn'),
            userType: sessionStorage.getItem('userType'),
            userId: sessionStorage.getItem('user_id'),
            fullName: '',
            toggle: false,
            data: []
        }

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(bool) {
        this.setState({toggle: bool})
    }

    logout() {
        sessionStorage.clear();
        window.location = '/';
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
                <ListItem onClick={() => this.toggleDrawer(false)}>
                    <Link style={{textDecoration: "none", color: "black"}} to="/landlord">View Listings</Link>
                </ListItem>
                <ListItem onClick={() => this.toggleDrawer(false)}>
                    <Link style={{textDecoration: "none", color: "black"}} to="/landlord/addlisting">Add a Listing</Link>
                </ListItem>
                <ListItem onClick={() => this.toggleDrawer(false)}>
                    <Link style={{textDecoration: "none", color: "black"}} to="/landlord/support">Create a Support Ticket</Link>
                </ListItem>
                <ListItem onClick={() => this.toggleDrawer(false)}>
                    <Link style={{textDecoration: "none", color: "black"}} to="/landlord/settings">Account Settings</Link>
                </ListItem>
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
                        <Route exact path="/landlord">
                            <Typography style={{paddingTop: '20px', textAlign: 'center'}} variant="h4">Hello, {this.state.fullName}</Typography> 
                            <Typography style={{paddingTop: '20px', paddingBottom: '20px', textAlign: 'center'}} variant="h5">Your Listings</Typography>
                            <ListingsBox />
                        </Route>
                        <Route exact path="/landlord/addlisting">
                            <AddListingForm />    
                        </Route>
                        <Route exact path="/landlord/support">
                            <h1>Create Support Ticket</h1>
                            <AdminSupportTicket />    
                        </Route>
                        <Route exact path="/landlord/settings">
                            <h1>Account Settings</h1>    
                        </Route>
                    </div>
                }
            </MuiThemeProvider>
        )
    }
}