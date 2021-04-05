import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './style.css';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SupportIcon from "@material-ui/icons/ContactSupport";
import IconButton from "@material-ui/core/IconButton";
export default class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: sessionStorage.getItem('user_id'),
            fullName: '',
            room: false,
            flat: false,
            cheapest: false
        }
        this.handleRoomChange = this.handleRoomChange.bind(this)
        this.handleFlatChange = this.handleFlatChange.bind(this)
        this.handleCheapestChange = this.handleCheapestChange.bind(this)
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

    render() {
        return (
            <div id="container">
                <div id="header">
                    <Button id="logoutBtn" variant="contained" color="primary" onClick={this.logout}>Logout</Button> 
                    <IconButton style={{ fontSize: 30, float: "right" }}>
                        <SupportIcon style={{ marginTop: "-5px", marginRight: "10px"}} />
                    </IconButton>
                    <div id="search">
                        <Typography variant="h4" style={{fontWeight: "bolder"}}>Search for a listing</Typography>
                        <div id="textboxes">
                            <div className="field">
                                <TextField id="standard-basic" type="number" label="Max Rent" onChange={(e) => this.setState({maxRent: e.target.value})}/>
                            </div>
                            <div className="field">
                                <TextField id="standard-basic" label="Country" />
                            </div>
                            <div className="field">
                                <TextField id="standard-basic" label="City" />
                            </div>
                            <div className="field">
                                <TextField id="standard-basic" label="County" />
                            </div>
                        </div>
                        <FormControlLabel control={<Checkbox checked={this.state.room} onChange={this.handleRoomChange} name="room" />} label="Room"/>
                        <FormControlLabel control={<Checkbox checked={this.state.flat} onChange={this.handleFlatChange} name="flat" />} label="Flat"/>
                        <FormControlLabel control={<Checkbox checked={this.state.cheap} onChange={this.handleCheapestChange} name="cheapest" />} label="Sort By Cheapest"/>                
                        <Button id="searchBtn" variant="contained" color="primary">Search for Listing </Button> 
                    </div>
                </div>
            </div>
        )
    }
}