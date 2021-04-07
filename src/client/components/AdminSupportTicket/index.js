import React from "react";
import TextField from "@material-ui/core/TextField"

export default class AdminSupportTicket extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (<div>
                    <TextField style={{width: "40%"}} className="formItem" id="outlined-basic" label="Email" type="email" variant="outlined" //textfields for updating state, API handler uses hash to convert 
        onChange = {(event) => this.setState({"email" : event.target.value})}/>
        </div>)

    }
}