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
import { FullscreenExit } from '@material-ui/icons';

//requires landlord class
//gets listings from this class -> instance based on session?


export default class Gallery extends React.Component {

    constructor(props){
        super(props); //maybe used to take data from front-page, i.e. landlord instance from user var

        this.state = { //state to be sent for logging in
          address: '123 Sesame Street, London, E1 4NS, United Kingdom',

        }
        //this.ApiHandler = ApiHandlerInstance; //API handler for database handling!
      }

    

      render() {
        return (
          <div>
            <Typography variant="h5" style={{textAlign: 'center', paddingTop: "20px"}}>{this.state.address}</Typography>
            <div style={{ paddingTop: "30px", color: "#494949", width: "600px", height: "700px", margin: "0 auto", overflow: "auto" }}>
                <Carousel
                    className="SecondExample"
                    autoPlay="false"
                    animation="slide"
                    indicators="false"
                    timeout="300"
                    navButtonsAlwaysVisible="true"
                >
                  {this.props.imgSrc.map((record) => (
                    <Paper>
                  <div>
                    <img src = {record.img}
                    width = "600"
                    height = "600">
                    </img>
                  </div>
                  </Paper>
                  ))}
                </Carousel>
              </div>
            </div>
        )
    }
  }
    
