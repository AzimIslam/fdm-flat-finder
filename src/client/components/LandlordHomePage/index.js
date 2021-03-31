import Typography from "@material-ui/core/Typography";
import React from "react";
import AddListingForm from "../AddListingForm";
import ListingBox from "./../ListingsBox/"
import './style.css';

export default class LandlordHomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            loggedIn: sessionStorage.getItem('loggedIn'),
            userType: sessionStorage.getItem('userType'),
            userId: sessionStorage.getItem('user_id'),
            fullName: ''
        }
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

    render() {
        return (
            <div>
                <Typography id="welcomeMessage" variant="h4">Hello, {this.state.fullName}</Typography>
                <AddListingForm />
                {/* <Typography id="listingsText" variant="h4">Your Listings:</Typography>
                <ListingBox /> */}
            </div>
        );
    }
}