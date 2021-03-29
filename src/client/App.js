import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './app.css';
import ReactImage from './react.png';
import LoginBox from './components/LoginBox';
import RegisterBox from './components/RegisterBox';
import Header from './components/Header';

import ApiHandler from './helpers/ApiHandler';
export default class App extends Component {
  constructor(props){
    super(props)
    this.toggleregister = this.toggleregister.bind(this);
    this.state = { username: null, 
      isregistered: true,
      text: "Create an account"
    };
    this.ApiHandler = new ApiHandler();
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

 toggleregister(){
   this.setState({isregistered: !this.state.isregistered})
   if (this.state.isregistered){
     this.setState({text: "Login"})
   } else {
    this.setState({text: "Create an account"})
   }

 }

  render() {
    const { username } = this.state;
    
    
    return (
      <div>
        <Header/>
        {(this.state.isregistered) ?  <LoginBox></LoginBox> :  <RegisterBox></RegisterBox>}
        {
          /*
          <Button onClick= {this.toggleregister} variant="contained" color="primary">{this.state.text}</Button>
          */
        }
      </div>
    );
  }
}