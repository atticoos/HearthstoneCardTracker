import React from 'react';
import Login from './login';
import Decks from './decks';
import Hearthstats from './hearthstats-service';
import {Router, Route, IndexRoute} from 'react-router';
import history from './history';


class DeckManagerApp extends React.Component {
  constructor () {
    super();
    this.state = {
      loggedIn: Hearthstats.isLoggedIn()
    };
  }
  componentDidMount() {
    if (this.state.loggedIn) {
      history.replaceState(null, '/decks');
    }
  }
  onLoggedIn(token) {
    this.state.loggedIn = true;
    this.setState(this.state);
  }
  render() {
    return (
      <Router history={history}>
        <Route path="/Users/ajwhite/Development/Labs/hearthstone-tracker/src/windows/deck-manager-window.html" component={Login} />
        <Route path="/decks" component={Decks} />
      </Router>
    );
  }
  // render () {
  //   if (this.state.loggedIn) {
  //     return (
  //       <Decks />
  //     );
  //   } else {
  //     return (
  //       <Login onLogin={token => this.onLoggedIn(token)} />
  //     );
  //   }
  // }
}

export default DeckManagerApp;
