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
        this.state = {
            radioValue: '0',
            address1: '',
            address2: '',
            city: '',
            county: '',
            postcode: '',
            country: '',
            rent: '',
            success: false,
            fileName: 'No file selected',
            file: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitRequest = this.submitRequest.bind(this)
        this.selectFile = this.selectFile.bind(this)
    }

    selectFile(event) {
        let file = event.target.files[0];
        this.setState({fileName: file.name, file: file})
    }

    submitRequest() {
        let req = {
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            county: this.state.county,
            postcode: this.state.postcode,
            country: this.state.country,
            rent: this.state.rent,
            isRoom: 0,
            landlordID: sessionStorage.getItem('user_id'),
            fileName: '',
            file: ''
        }

        req.isFlat = Number(this.state.radioValue)

        fetch(`/api/user/createListing`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
        })
    }


    handleChange(event) {
        this.setState({radioValue: event.target.value})
    }
    render() {
        return <form className="listingForm" onSubmit={e=> {console.log(e)}}>
            <Typography id="listingTitle" variant="h4">Add a Listing</Typography>
            <TextField id="standard-basic" onChange={(e) => this.setState({address1: e.target.value})} label="Address Line 1"></TextField>
            <TextField id="standard-basic" onChange={(e) => this.setState({address2: e.target.value})} label="Address Line 2"></TextField>
            <TextField id="standard-basic" onChange={(e) => this.setState({city: e.target.value})} label="City"></TextField>
            <TextField id="standard-basic" onChange={(e) => this.setState({county: e.target.value})} label="County"></TextField>
            <TextField id="standard-basic" onChange={(e) => this.setState({postcode: e.target.value})} label="Postcode"></TextField>
            <TextField id="standard-basic" onChange={(e) => this.setState({country: e.target.value})} label="Country"></TextField>
            <TextField id="standard-basic" type="number" label="Rent Per Month" onChange={(e) => this.setState({rent: e.target.value})}/>
            <div className="listingRadios">
                <FormLabel component="legend">Listing Type</FormLabel>
                <RadioGroup aria-label="gender" name="listing" value={this.state.radioValue} onChange={this.handleChange}>
                    <FormControlLabel value="0" control={<Radio />} label="Flat" />
                    <FormControlLabel value="1" control={<Radio />} label="Room" />
                </RadioGroup>
            </div>
            <div id="file-upload">
                <div style={{ width: '100%', float: 'left' }}>
                    <Typography style={{color: 'rgba(0, 0, 0, 0.54)'}}>Image Upload</Typography>
                </div>
                <input type="file" id="contained-button-file" accept="image/*" style={{ display: 'none' }} onChange={this.readFileName}/>
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" style={{display: 'inline-block'}}>
                        Upload
                    </Button>
                </label>
                <Typography style={{float: 'right'}}>{this.state.fileName}</Typography>
            </div>
            <Button variant="contained" color="primary" onClick={this.submitRequest} style={{marginTop: '10px'}}>Add Listing</Button>
        </form>
    }
}