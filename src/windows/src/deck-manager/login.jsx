import React from 'react';
import Hearthstats from './hearthstats-service';
console.log('Y U NO EXIST', Hearthstats);

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
    .then(this.props.onLogin)
    .catch(error => console.log('login error', error));
  }
  render () {
    return (
      <div>
        <h2>Hearthstats Login</h2>
        <div>
          <input type="email"
                 value={this.state.email}
                 onChange={(evt) => {
                   this.setState({email: evt.target.value, password: this.state.password})
                 }}/>
        </div>
        <div>
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
