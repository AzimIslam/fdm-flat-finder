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
        //this.ApiHandler = ApiHandlerInstance; //API handler for database handling!
        console.log(this.props.email)
      }

    

      render() {
        return (
          <div>
            <Typography variant="h5" style={{textAlign: 'center', paddingTop: "20px"}}>{this.props.address1}, {this.props.city}, {this.props.postcode}</Typography>
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
                <div>
                  <div style={{paddingTop: "10px"}}>
                    <center>
                      <Button onClick={() => window.open(`mailto:${this.props.email}`)} variant="contained" color="primary">Enquire about property</Button>
                    </center>
                  </div>        
                </div>
              </div>
            </div>
        )
    }
  }
    
