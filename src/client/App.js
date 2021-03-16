import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

import UserStore from './stores/UserStore'
import LButton from './client/loginButton';
import LoginForm from './client/login';
import InputFields from './client/fields';


export default class App extends Component {
  state = { username: null };

  async componentDidMount(){

    let res = await fetch('LoggedIn', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    });
  
    let result = await res.json();
  
    if (result && result.flag) {
      UserStore.LoggedIn = true;
      UserStore.username = result.username; 
    }
  
    else {
      UserStore.LoggedIn = false;
   }
  
  }
  
  async Logout(){
  
    let res = await fetch('logout', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    });
  
    let result = await res.json();
  
    if (result && result.flag) {
      UserStore.LoggedIn = false;
      UserStore.username = '';
    }
  
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}
 export default App;