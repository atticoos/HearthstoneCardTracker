import React from 'react';
import Hearthstats from './hearthstats-service';
import history from './history';

class HearthstatsLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }
  login() {
    Hearthstats.login(this.state.email, this.state.password)
    .then(token => {
      history.replaceState(null, '/decks');
    })
    .catch(error => console.log('login error', error));
  }
  render () {
    return (
      <div className="login">
        <h2>Hearthstats Login</h2>
        <div className="field-control">
          <input type="email"
                 value={this.state.email}
                 onChange={(evt) => {
                   this.setState({email: evt.target.value, password: this.state.password})
                 }}/>
        </div>
        <div className="field-control">
          <input type="password"
                 value={this.state.password}
                 onChange={(evt) => {
                   this.setState({email: this.state.email, password: evt.target.value})
                 }} />
        </div>
        <button onClick={() => this.login()}>Login</button>
      </div>
    );
  }
}

export default HearthstatsLogin;
