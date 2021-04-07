import React, {Component} from "react";
import './style.css';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/typography";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import 'fontsource-roboto';
import CreateSupportTicket from "../../components/CreateSupportTicket";
import Button from '@material-ui/core/Button';

export default class Support extends React.Component {
    constructor() {
        super()
        this.state = {
            loggedIn: sessionStorage.getItem('loggedIn'),
            userType: sessionStorage.getItem('userType'),
            userId: sessionStorage.getItem('user_id'),
            fullName: ''
        }
    }

    logout() {
        sessionStorage.clear();
        window.location = '/';
    }

    supportTicket() {
        window.location = '/support';
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

                        <div className="suppBox">
                            <Button variant="contained" color="secondary" onClick={this.supportTicket}>Support</Button>
                        </div>

                        <div className="userTools">
                            <Button variant="contained" color="secondary" onClick={this.logout}>Logout</Button>
                        </div>

            
                    </Toolbar>
                    <CreateSupportTicket name={this.props.fullName} />
                    </div>
                }
            </div>
        )
    }
}