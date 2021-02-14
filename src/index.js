import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './style/index.css';
import Header from './componentes/Header'
import Home from './pages/Home'
import Lobby from './pages/Lobby'
import GameContext from './context/GameContext'

import * as serviceWorker from './serviceWorker';

const App = () => {
  return (
    <Router>

    <div className="container">
      <Switch>
        <Route exact path="/">
          <Lobby/>
        </Route>
        <Route exact path="/play">
          <Home/>
        </Route>
      </Switch>
    </div>

    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
