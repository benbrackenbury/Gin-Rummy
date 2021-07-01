import React, {useState, useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './style/index.css';
import Header from './componentes/Header'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Lobby from './pages/Lobby'
import Welcome from './pages/Welcome'
import Rules from './pages/Rules'
import End from './pages/End'
import GameContext from './context/GameContext'

import * as serviceWorker from './serviceWorker';

const App = () => {
  
  const [gameState, _setGameState] = useState(null)
  const [prevGameState, setPrevGameState] = useState('')
  const [playerName, setPlayerName] = useState('Player 1')
  const [isFindingGame, setIsFindingGame] = useState(false)
  const [players, setPlayers] = useState([])
  const [roundsPlayed, setRoundsPlayed] = useState(2)
  
  return (
    <GameContext.Provider value={{gameState, _setGameState, prevGameState, setPrevGameState, playerName, setPlayerName, players, setPlayers, isFindingGame, setIsFindingGame, roundsPlayed, setRoundsPlayed}}>
      <Router basename={'/'}>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Welcome/>
              </Route>
              <Route exact path="/rules">
                <Rules/>
              </Route>
              <Route exact path="/lobby">
                <Lobby/>
              </Route>
              <Route exact path="/chat">
                <Chat/>
              </Route>
              <Route exact path="/play">
                <Home/>
              </Route>
              <Route exact path="/end">
                <End/>
              </Route>
            </Switch>
          </div>
      </Router>
    </GameContext.Provider>
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
