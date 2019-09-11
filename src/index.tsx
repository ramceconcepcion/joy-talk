import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';
import WebSocket from './scripts/services/websocket';

import App from './scripts/main';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//WebSocket.run();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
