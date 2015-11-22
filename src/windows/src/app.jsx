'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import Cards from './cards';

// class Foo extends React.Component {
//   render() {
//     return (
//       <h2>Bar</h2>
//     );
//   }
// }
//
// if (document.getElementById('player-root')) {
//   ReactDom.render(<Foo />, document.getElementById('player-root'));
// } else {
//   ReactDom.render(<Foo />, document.getElementById('opponent-root'));
// }

// // import Cards from './cards';
//
if (document.getElementById('player-root')) {
  ReactDom.render(<Cards type="player" />, document.getElementById('player-root'));
} else {
  ReactDom.render(<Cards type="opponent" />, document.getElementById('opponent-root'));
}
