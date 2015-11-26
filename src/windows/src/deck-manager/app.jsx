import React from 'react';
import Login from './login';
import Decks from './decks';
import Hearthstats from './hearthstats-service';

class DeckManagerApp extends React.Component {
  constructor () {
    super();
    this.state = {
      loggedIn: false
    };
  }
  onLoggedIn(token) {
    this.state.loggedIn = true;
    this.setState(state);
    console.log('got teh token', token);
  }
  render () {
    if (this.state.loggedIn) {
      return (
        <Decks />
      );
    } else {
      return (
        <Login onLogin={this.onLoggedIn} />
      );
    }
  }
}

export default DeckManagerApp;
