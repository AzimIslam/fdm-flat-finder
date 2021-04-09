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
import LLSupportTicket from "../../components/LLSupportTicket";
import Listing from "../../components/Listing";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ImageGallery from 'react-image-gallery';
export default class ListingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: sessionStorage.getItem('loggedIn'),
            userType: sessionStorage.getItem('userType'),
            userId: sessionStorage.getItem('user_id'),
            fullName: '',
            toggle: false,
            data: [],

            listing_data: this.props.location.aboutProps.listing_data,
            mainPage: null,
            
            thumbnails: [
                {original: '../src/client/components/Listing/assets/flat1.jpg'}, //should be generalised using a map
                {original: '../src/client/components/Listing/assets/flat2.jpg'},
                {original: '../src/client/components/Listing/assets/flat3.jpg'},
                {original: '../src/client/components/Listing/assets/flat5.jpg'},
                {original: '../src/client/components/Listing/assets/flat6.jpg'},
                {original: '../src/client/components/Listing/assets/flat7.jpg'},
                {original: '../src/client/components/Listing/assets/flat8.jpg'},
                {original: '../src/client/components/Listing/assets/flat9.jpg'},
                {original: '../src/client/components/Listing/assets/flat10.jpg'}, 
            ],
            randomIndex: Math.round(Math.random() * 9)  
        }
        console.log(this.state.userType);
        console.log(this.state.listing_data);
        if (this.state.userType == "member"){
            this.state.mainPage = "/member"
        }
        else if (this.state.userType == "landlord"){
            this.state.mainPage = "/landlord"
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

    /* //fetch needs to be implemented
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
    } */


    list() {
        return ( 
            <List style={{width: 250}}>
                <ListItem onClick={() => this.toggleDrawer(false)}>
                    <Link style={{textDecoration: "none", color: "black"}} to={"/"+ this.state.userType + "/"}>Back </Link> {/* could just label this back for now?*/}
                </ListItem>
                
            </List>
        )
    }

    gallery() { //gallery component used to show images



        return (
            <ImageGallery items = {this.state.thumbnails} showThumbnails = {false}></ImageGallery>
        )
    }

    render() {
        return ( //Rendering the page
             <MuiThemeProvider> 
                {
                    //this.state.userType != 'landlord'? <p>You are not a landlord</p>:
                    this.state.loggedIn != 'true' ? <p>You are not logged in</p>:
                    
                    <div>
                    <Toolbar style={{backgroundColor: "#3f51b5"}} variant="dense">
                        <IconButton onClick={() => this.toggleDrawer(true)} style={{color: "white"}} edge="start" color="inherit" aria-label="open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography style={{fontWeight: "lighter", color: "white"}}variant="h6">
                            Listing view
                        </Typography>

                        <div className="userTools">
                            <Button variant="contained" color="secondary" onClick={this.logout}>Logout</Button>
                        </div>
                    </Toolbar>
                    
                    {/* here is where the listing stuff actually goes*/}
                    <div id="container">
                        {this.gallery()}
                        <Typography style={{fontWeight: "lighter", color: "white"}}variant="h6">
                            {this.state.listing_data.id}
                        </Typography>
                    </div>

                        <Drawer anchor={'left'} open={this.state.toggle} onClose={() => this.toggleDrawer(false)}>
                        {this.list()}
                        </Drawer>

                    </div>
                }
            </MuiThemeProvider>
        )
    }
}