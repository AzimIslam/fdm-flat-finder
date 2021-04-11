import React, {Component} from "react";
import './style.css';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/typography";
import IconButton from '@material-ui/core/IconButton';
import Arrow from '@material-ui/icons/ArrowBack';
import 'fontsource-roboto';
import Button from '@material-ui/core/Button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Gallery from "../../components/Gallery";

export default class ListingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: sessionStorage.getItem('loggedIn'),
            userType: sessionStorage.getItem('userType'),
            userId: sessionStorage.getItem('user_id'),
            address1: '',
            address2: 'N/A',
            county: 'N/A',
            city: '',
            postcode: '',
            agencyName: '',
            email: '',
            rent: '',
            listingType: '',
            isRoom: 0,
            media: [
                {img: '../src/client/components/Listing/assets/flat1.jpg',
                title: "test"}, //should be generalised using a map
                {img: '../src/client/components/Listing/assets/flat2.jpg',
                title: "test"},
                {img: '../src/client/components/Listing/assets/flat3.jpg',
                title: "test"},
                {img: '../src/client/components/Listing/assets/flat5.jpg',
                title: "test"},
                {img: '../src/client/components/Listing/assets/flat6.jpg',
                title: "test"},
                {img: '../src/client/components/Listing/assets/flat7.jpg',
                title: "test"},
                {img: '../src/client/components/Listing/assets/flat8.jpg',
                title: "test"},
                {img: '../src/client/components/Listing/assets/flat9.jpg',
                title: "test"},
                {img: '../src/client/components/Listing/assets/flat10.jpg',
                title: "test"}, 
            ],
            randomIndex: Math.round(Math.random() * 9)  
        }
        console.log(this.state.userType);
        console.log(this.state.listing_data);
        if (this.state.userType == "member"){
            this.state.mainPage = "/member"
        }
        else if (this.state.userType == "landlord"){
            this.state.mainPage = "/LandlordCP"
        }
    }


    logout() {
        sessionStorage.clear();
        window.location = '/';
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search);
        console.log(queryParams.get('id'));
        fetch('/api/user/getListingForMember', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ListingID: queryParams.get('id')})
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                address1: data['AddressLine1'],
                address2: data['AddressLine2'],
                city: data['City'],
                county: data['County'],
                postcode: data['Postcode'],
                country: data['Country'],
                rent: data['RentPerMonth'],
                email: data['Email'],
                agencyName: data['AgencyName'],
                isRoom: data['IsRoom']
            })
        })
    }

    render() {
        return ( //Rendering the page
             <MuiThemeProvider> 
                {
                    //this.state.userType != 'landlord'? <p>You are not a landlord</p>:
                    this.state.loggedIn != 'true' ? <p>You are not logged in</p>:
                    
                    <div>
                    <Toolbar style={{backgroundColor: "#3f51b5"}} variant="dense">
                        <IconButton onClick={() => window.location = this.state.mainPage} style={{color: "white"}} edge="start" color="inherit" aria-label="open drawer">
                            <Arrow />
                        </IconButton>
                        <Typography style={{fontWeight: "lighter", color: "white"}}variant="h6">
                            Back to Listings
                        </Typography>

                        <div className="userTools">
                            <Button variant="contained" color="secondary" onClick={this.logout}>Logout</Button>
                        </div>
                    </Toolbar>
                    
                        {/* here is where the listing stuff actually goes*/}
                        <div id="container">
                            <Gallery address1={this.state.address1} city={this.state.city} postcode={this.state.postcode} email={this.state.email} country={this.state.country} imgSrc = {this.state.media} ></Gallery> 
                        </div>

                        <div className="info" style={{padding: "50px"}}>
                            <div className="section">
                                <Typography variant="h4">                   
                                    Listing info
                                </Typography>
                                <Typography variant="body1">
                                    Address Line 1: {this.state.address1}
                                </Typography>
                                <Typography variant="body1">
                                    Address Line 2: {this.state.address2 == '' ? 'N/A': this.state.address2 }
                                </Typography>
                                <Typography variant="body1">
                                    County: {this.state.county  == '' ? 'N/A': this.state.county}
                                </Typography>
                                <Typography variant="body1">
                                     City: {this.state.city}
                                </Typography>
                                <Typography variant="body1">
                                     Postcode: {this.state.postcode}
                                </Typography>
                                <Typography variant="body1">
                                    Listing Type: {this.state.isRoom == 1 ? "Room" : "Flat"}
                                </Typography>
                                <Typography variant="body1">
                                     Country: {this.state.country}
                                </Typography>
                                <Typography variant="body1">
                                     Agency Name: {this.state.agencyName}
                                </Typography>
                                <Typography variant="body1">
                                     Email: {this.state.email}
                                </Typography>
                                <Typography variant="body1">
                                     Rent: £{this.state.rent}
                                </Typography>
                            </div>

                            <div className="section">
                                <Typography variant="h4">
                                    Description
                                </Typography>
                            </div>

                            <div className="section">
                                <Typography variant="body1">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim eu turpis egestas pretium aenean pharetra magna ac. Venenatis lectus magna fringilla urna porttitor rhoncus. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Tortor pretium viverra suspendisse potenti nullam ac tortor. Tristique senectus et netus et malesuada. At volutpat diam ut venenatis tellus in. Sed adipiscing diam donec adipiscing tristique risus nec. Dictum varius duis at consectetur lorem donec. At augue eget arcu dictum. Volutpat odio facilisis mauris sit. Sagittis eu volutpat odio facilisis mauris sit amet massa. Sit amet massa vitae tortor condimentum lacinia. Augue lacus viverra vitae congue eu consequat. Non consectetur a erat nam at lectus urna duis. Urna nec tincidunt praesent semper feugiat. Lorem sed risus ultricies tristique nulla aliquet enim. Orci porta non pulvinar neque laoreet. Ultrices vitae auctor eu augue ut lectus.
                                </Typography>
                            </div>

                            <div className="section">
                                <Typography variant="body1">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim eu turpis egestas pretium aenean pharetra magna ac. Venenatis lectus magna fringilla urna porttitor rhoncus. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Tortor pretium viverra suspendisse potenti nullam ac tortor. Tristique senectus et netus et malesuada. At volutpat diam ut venenatis tellus in. Sed adipiscing diam donec adipiscing tristique risus nec. Dictum varius duis at consectetur lorem donec. At augue eget arcu dictum. Volutpat odio facilisis mauris sit. Sagittis eu volutpat odio facilisis mauris sit amet massa. Sit amet massa vitae tortor condimentum lacinia. Augue lacus viverra vitae congue eu consequat. Non consectetur a erat nam at lectus urna duis. Urna nec tincidunt praesent semper feugiat. Lorem sed risus ultricies tristique nulla aliquet enim. Orci porta non pulvinar neque laoreet. Ultrices vitae auctor eu augue ut lectus.
                                </Typography>
                            </div>
                        </div>

                    </div>
                }
            </MuiThemeProvider>
        )
    }
}