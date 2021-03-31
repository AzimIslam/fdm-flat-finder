import React, {Component} from "react";
import './style.css';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Typography from "@material-ui/core/typography";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import 'fontsource-roboto';
import LandlordHomePage from "../../components/LandlordHomePage";

import ListingsBox from '../../components/ListingsBox';
import Listing from '../../helpers/Listing';

export default class Landlord extends React.Component {
    constructor() {
        super()
        this.state = {
            loggedIn: sessionStorage.getItem('loggedIn'),
            userType: sessionStorage.getItem('userType')
        }
    }
    

    render() {
        return (
            <div>
                {
                    this.state.userType != 'landlord'? <p>You are not a landlord</p>:
                    this.state.loggedIn != 'true' ? <p>You are not logged in</p>:
                    <div>
                    <Toolbar style={{backgroundColor: "#3f51b5"}} variant="dense">
                        <IconButton style={{color: "white"}} edge="start" color="inherit" aria-label="open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography style={{fontWeight: "lighter", color: "white"}}variant="h6">
                            Landlord Control Panel
                        </Typography>

                        <div className="userTools">
                            <IconButton style={{color: "white"}} color="inherit">
                                <Badge badgeContent={103} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton style={{color: "white"}} start="end" color="inherit">
                                <AccountCircle />
                            </IconButton>

                            
                        </div>

                        
                    </Toolbar>
                    <LandlordHomePage />
                    </div>

                
                }
                <ListingsBox></ListingsBox>
            </div>
        )
    }
}