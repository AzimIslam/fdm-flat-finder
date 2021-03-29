import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';

class Header extends React.Component {
    constructor() {
        super()
    }

    render() {
        let style = {
            textTransform: "uppercase",
            color: "#333",
            padding: "20px",
            fontWeight: "lighter"
        };
        return <Typography style={style} variant="h4">FDM Flat Finder</Typography>
    }
}

export default Header;