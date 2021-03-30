import React, {Component} from "react";
import './style.css';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/typography";
import 'fontsource-roboto';

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
                            <Typography style={{fontWeight: "lighter", color: "white"}}variant="h6">
                                Landlord Control Panel
                            </Typography>
                            <Button style={{color: 'white'}}>Login</Button>
                        </Toolbar>
                    </div>
                }
            </div>
        )
    }
}