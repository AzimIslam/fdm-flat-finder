import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './style.css'

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
        this.handleRoomChange = this.handleRoomChange.bind(this)
    }

    handleRoomChange(event) {
        this.setState({room: !this.state.room})
    }

    handleFlatChange(event) {
        this.setState({change: !this.state.change})
    }

    handleCheapestChange(event) {
        this.setState({cheapest: !this.state.cheapest})
    }

    render() {
        return (
            <div id="container">
                <div id="header">
                    <TextField id="standard-basic" type="number" label="Max Rent" onChange={(e) => this.setState({maxRent: e.target.value})}/>
                    <TextField id="standard-basic" label="Country" />
                    <TextField id="standard-basic" label="City" />
                    <TextField id="standard-basic" label="County" />
                    <FormControlLabel control={<Checkbox checked={this.state.room} onChange={this.handleRoomChange} name="room" />} label="Room"/>
                    <FormControlLabel control={<Checkbox checked={this.state.room} onChange={this.handleFlatChange} name="flat" />} label="Flat"/>
                    <FormControlLabel control={<Checkbox checked={this.state.room} onChange={this.handleCheapestChange} name="cheapest" />} label="Sort By Cheapest"/>                
                </div>
            </div>
        )
    }
}