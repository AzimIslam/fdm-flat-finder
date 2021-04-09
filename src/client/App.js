import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Member from './routes/Member';
import LandlordCP from './routes/LandlordCP';
import Home from './routes/Home';
import ListingPage from './routes/ListingPage';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/member' component={Member} />
          <Route path="/landlord"  component={LandlordCP} />
          <Route path="/listingpage"  component={ListingPage} />
          <Route path="/"  component={Home} />
        </Switch>
      </Router>
    )
  }
}
