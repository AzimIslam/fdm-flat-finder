import React, { Component } from 'react';
/*import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper' */
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Container from '@material-ui/core/Container';

import {View, ScrollView} from 'react-native';
//requires landlord class
//gets listings from this class -> instance based on session?




export default class Gallery extends React.Component {

    constructor(props){
        super(props); //maybe used to take data from front-page, i.e. landlord instance from user var

        this.state = { //state to be sent for logging in
            // username: ' '
            
            


            //could remove?? and use landlord var
            //imgSrc = [] //hardcode images

        }

        //this.ApiHandler = ApiHandlerInstance; //API handler for database handling!
        
        }


          SingleLineGridList() {
   
          
            return (

              
              <div className="root">

                


                {/*
                <Container maxheight={10}>
                <GridList cellHeight={160} className = "grid-list" cols = {4} >

                  {this.props.imgSrc.map((record) => (
                    <GridListTile className= "grid-list-tile" key={record.img} >
                      <img src={record.img} alt={record.title} />
                      <GridListTileBar
                        title={record.title}
                        classes = {{
                          root: "title-bar",
                          title: "title",
                        }} 
                        actionIcon={
                          <IconButton aria-label={`star ${record.title}`}>
                            <StarBorderIcon className= "title" />
                          </IconButton>
                        }
                      />
                    </GridListTile>
                  ))}
             
                      </GridList> 
                </Container> */}
              </div> 
            );
          }

        render(){
            return ( 
                
                <div> 
                    {this.SingleLineGridList()}
                </div>
                
            )

            }
 

}
