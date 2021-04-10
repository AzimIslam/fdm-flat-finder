import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel'
import {
  FormLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Paper,
  Button,
  Slider,
  Typography
} from '@material-ui/core'
import Container from '@material-ui/core/Container';

//requires landlord class
//gets listings from this class -> instance based on session?


export default class Gallery extends React.Component {

    constructor(props){
        super(props); //maybe used to take data from front-page, i.e. landlord instance from user var

        this.state = { //state to be sent for logging in
            // username: ' '
            //could remove?? and use landlord var

        }
        //this.ApiHandler = ApiHandlerInstance; //API handler for database handling!
      }

    

      render() {
        return (
            <div style={{ marginTop: "50px", color: "#494949" }}>
                <h2>Selected Listing:</h2>

                <Carousel
                    className="SecondExample"
                    autoPlay="false"
                    animation="slide"
                    indicators="false"
                    timeout="300"
                    navButtonsAlwaysVisible="true"
                >
                  {this.props.imgSrc.map((record) => (
                    <Paper 
                    style={{backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center"             
                  }}>
                  <div style = {{
                    justifyContent: "center",
                    alignItems: "center"    
                  }}>
                    <h2>Property Images:</h2>
                    <img src = {record.img}
                    width = "400"
                    height = "400">
                    </img>
                  </div>
                  </Paper>
                  ))}
                </Carousel>
              </div>
        )
    }
  }
    
