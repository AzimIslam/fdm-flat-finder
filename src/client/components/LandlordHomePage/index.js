import Typography from "@material-ui/core/Typography";
import React from "react";

export default class LandlordHomePage extends React.Component {
    render() {
        return (
            <div>
                <Typography variant="h1">Hello, {this.props.name}</Typography>
            </div>
        );
    }
}