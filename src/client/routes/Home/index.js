import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './style.css';
import Typography from '@material-ui/core/Typography';
import LoginBox from '../../components/LoginBox';
import RegisterBox from '../../components/RegisterBox';
import Header from '../../components/Header';
import ApiHandler from '../../helpers/ApiHandler';

export default class Home extends Component {
  constructor(props){
    super(props)
    this.toggleregister = this.toggleregister.bind(this);
    this.state = { username: null, 
      isregistered: true,
      text: "Create an account",
      text2: "Don't have an account?"
    };
    this.ApiHandler = new ApiHandler();
  }

 toggleregister(){
   this.setState({isregistered: !this.state.isregistered})
   if (this.state.isregistered){
     this.setState({text: "Login", text2: "Already have an account?"})
   } else {
    this.setState({text: "Create an account", text2: "Don't have an account?"})
   }

 }

  render() {
    const { username } = this.state;
    return (
      <div id="homeBack">
        <Header/>
        {(this.state.isregistered) ?  <LoginBox></LoginBox> :  <RegisterBox></RegisterBox>}
        {
          <div id="registerBox">
            <Typography id="text">{this.state.text2}</Typography>
            <Button onClick= {this.toggleregister} variant="contained" color="primary">{this.state.text}</Button>
          </div>
        }
      </div>
    );
  }
}