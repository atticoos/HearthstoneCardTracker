const BASE_URI = 'https://hearthstats.net/api/v3';
var authToken = null;

function login (email, password) {
  return fetch(BASE_URI + '/users/sign_in', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      user_login: {
        email: email,
        password: password
      }
    })
  })
  .then(response => response.json())
  .then(response => authToken = response.auth_token);
}

function getDecks () {

}

function isLoggedIn () {
  return !!authToken;
}

var service = {
  login: login,
  getDecks: getDecks,
  isLoggedIn: isLoggedIn,
  authToken: authToken
};

export default service;

// export default {login, getDecks, isLoggedIn};
