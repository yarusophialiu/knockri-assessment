import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; //import bootstrap
import '../node_modules/video-react/dist/video-react.css'; // import css


ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
