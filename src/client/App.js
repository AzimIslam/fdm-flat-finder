import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import LoginBox from './components/LoginBox';
import RegisterBox from './components/RegisterBox';

import Listings from './components/ListingsBox';
import ListingsBox from './components/ListingsBox';
import FrontPage from './components/FrontPage';

import ApiHandler from './helpers/ApiHandler';

export default class App extends Component {
  constructor(props){
    super(props)
    this.toggleregister = this.toggleregister.bind(this);
    this.state = { username: null, 
      isregistered: true,
      isloggedin: true,
      text: "Create an account"
    };
    this.ApiHandler = new ApiHandler();
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    
    
    //need an event for when logged in -> for sake of testing I've set isloggedin to true

    return (
      
      //need to take logged in state from inside LoginBox to out here, use props??
      //need switch case for when logged in??
      
      //have to find a way of doing this in a more OOP way
      <div>
        
        
        {(this.isloggedin) ?  <ListingsBox></ListingsBox>:  
        //transitions from front page into ListingBox 
        //-> replace with <FrontPage> </FrontPage> later and use state with switch to access other pages or find an more 'OOP way'
            (this.state.isregistered) ? <LoginBox></LoginBox> :  <RegisterBox></RegisterBox>, <Button onClick= {this.toggleregister} variant="contained" color="primary">{this.state.text}</Button>}
      </div>
    );
  }
}
