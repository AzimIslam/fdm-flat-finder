
import React, { Component } from 'react';
import './style.css';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
//import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Listing from '../../helpers/Listing';

export default class MemberListing extends React.Component{ //must be stored in a list, must be rendered in a listing using keys on ListingBox  



    constructor(props){
        super(props);
        this.state = {
            listing: null,
            expanded: false
        }

        
    }

 /*old style    display: flex;
 flex-direction: column;
 padding: 20px;
 width: 40%;
 margin: 0 auto;
 overflow: auto;
 background-color: white;
 border: 1px solid #eee;
 border-radius: 1em;
 margin-top: 10px;
 opacity: 0.9; */

    render(){
        console.log(this.state.title);
        return(

            
            //create 

            
            <Card className = "member-listing"> 
                <CardHeader
                action = {
                    <IconButton aria-label="settings">
                    <MoreVertIcon />
                    </IconButton>
                }
                title = {this.state.listing.state.title} 

                />

                <CardMedia className = "card-media"

                    /* image = source/ */ />
                <CardActions> 
                <IconButton className = "expand"
                onClick = {this.expandView()}/>
                </CardActions>

                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit> 

                <Typography variant="body2" color="textSecondary" component="p">

                
                
                </Typography>
                
                </Collapse>

            </Card> 

            

        ) 

    }


    expandView(){ //just sets expanded to true, card has the rest of the details
        this.state.expanded = false;
    }
}
