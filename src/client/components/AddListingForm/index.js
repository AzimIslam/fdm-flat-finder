import React from "react";
import TextField from "@material-ui/core/TextField";
import './style.css';
import Typography from "@material-ui/core/Typography";
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from "@material-ui/core/Radio"
import { Button } from "@material-ui/core";


export default class AddListingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {radioValue: 'flat'}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({radioValue: event.target.value})
    }
    render() {
        return <form className="listingForm">
            <Typography id="listingTitle" variant="h4">Add a Listing</Typography>
            <TextField id="standard-basic" label="Address Line 1"></TextField>
            <TextField id="standard-basic" label="Address Line 2"></TextField>
            <TextField id="standard-basic" label="City"></TextField>
            <TextField id="standard-basic" label="County"></TextField>
            <TextField id="standard-basic" label="Postcode"></TextField>
            <TextField id="standard-basic" label="Country"></TextField>
            <div className="listingRadios">
                <FormLabel component="legend">Listing Type</FormLabel>
                <RadioGroup aria-label="gender" name="listing" value={this.state.radioValue} onChange={this.handleChange}>
                    <FormControlLabel value="flat" control={<Radio />} label="Flat" />
                    <FormControlLabel value="room" control={<Radio />} label="Room" />
                </RadioGroup>
            </div>
            <Button variant="contained" color="primary">Add Listing</Button>
        </form>
    }
}