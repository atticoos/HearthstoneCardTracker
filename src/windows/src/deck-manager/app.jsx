import React from 'react';
import Login from './login';
import Decks from './decks';
import Hearthstats from './hearthstats-service';

class DeckManagerApp extends React.Component {
  constructor () {
    super();
    this.state = {
      loggedIn: Hearthstats.isLoggedIn()
    };
  }
  onLoggedIn(token) {
    this.state.loggedIn = true;
    this.setState(this.state);
  }
  render () {
    if (this.state.loggedIn) {
      return (
        <Decks />
      );
    } else {
      return (
        <Login onLogin={token => this.onLoggedIn(token)} />
      );
    }
  }
}

export default DeckManagerApp;
