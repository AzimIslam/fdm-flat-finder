import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default class Listing extends React.Component {
    
    constructor() {
        super();
    }

    render() {
        return(
        <div>            
        <Card style={{minWidth: 275, display: 'inline-block'}}>
        <CardMedia style={{height: 140}} image={require('./assets/flat1.jpg')} />
            <CardContent>
                <Typography variant="h5">
                    £1000 PCM
                </Typography>
                <Typography variant="body2">
                    Flat to Rent
                </Typography>
                <Typography variant="body2">
                    Ashmore Road, Maida Vale, London W9
                </Typography>
            </CardContent>
        </Card>
        </div>
        );
    }
}