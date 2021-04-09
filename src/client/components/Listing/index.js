import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import ListingPage from '../../routes/ListingPage'

export default class Listing extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            thumbnails: [
                require('./assets/flat1.jpg'),
                require('./assets/flat2.jpg'),
                require('./assets/flat3.jpg'),
                require('./assets/flat4.jpg'),
                require('./assets/flat5.jpg'),
                require('./assets/flat6.jpg'),
                require('./assets/flat7.jpg'),
                require('./assets/flat8.jpg'),
                require('./assets/flat9.jpg'),
                require('./assets/flat10.jpg'),
            ],
            randomIndex: Math.round(Math.random() * 9)
        }
    }

    render() {
        return(          
        <Card style={{margin: "1em", minWidth: 275, display: 'inline-block'}}>
        <CardMedia style={{height: 140}} image={this.state.thumbnails[this.state.randomIndex]} />
            <CardContent>
                <Typography variant="h5">
                    £{this.props.rent} PCM
                </Typography>
                <Typography variant="body2">
                    {this.props.isRoom == 1 ? "Room to Rent": "Flat to Rent"}
                </Typography>
                <Typography variant="body2">
                    {this.props.address}, {this.props.city}, {this.props.postcode}
                </Typography>
                <Typography>
                    {this.props.country}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => window.open(`mailto:${this.props.email}`)} size="small" color="primary">
                    Contact     
                </Button>
                
                    <Button size="small" color="primary">
                        <Link style={{textDecoration: "none", color: "black"}} to="/listingpage/"> 
                        View Listing
                        </Link>
                    </Button>
              
            </CardActions>
        </Card>
        );
    }
}