import Promise from 'bluebird';
import Cards from 'hearthstone-log-adapter/src/cards';

const BASE_URI = 'https://hearthstats.net/api/v3';
const AUTH_STORAGE_KEY = 'deckmanager:token'
var authToken = localStorage.getItem(AUTH_STORAGE_KEY);

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
  .then(response => {
    authToken = response.auth_token;
    localStorage.setItem(AUTH_STORAGE_KEY, authToken);
    return authToken;
  });
}

function getDecks () {
  return fetch(BASE_URI + '/decks?auth_token=' + authToken)
  .then(response => response.json())
  .then(response => response.data);
}

function getCard (id) {
  console.log('fetching card', id);
  return fetch(BASE_URI + '/cards/' + id + '?auth_token=' + authToken)
  .then(response => response.json())
  .then(response => response.data)
  .then(card => {
    return Cards.getById(card.blizz_id);
  });
}

function getDeck(id) {
  return fetch(BASE_URI + '/decks/' + id + '/?auth_token=' + authToken)
  .then(response => response.json())
  .then(response => response.data)
  .then(deck => {
    var promises = deck.cardstring.split(',').map(card => {
      var cardId = card.split('_');
      cardId = cardId[0];
      return getCard(cardId);
    });
    return Promise.all(promises).then(cards => {
      deck.cards = cards;
      return deck;
    });
  });
}

function isLoggedIn () {
  return !!authToken;
}

var service = {
  login: login,
  getDecks: getDecks,
  isLoggedIn: isLoggedIn,
  authToken: authToken,
  getDeck: getDeck
};

export default service;

// export default {login, getDecks, isLoggedIn};
