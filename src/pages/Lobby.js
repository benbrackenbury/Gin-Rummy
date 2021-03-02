import React, {useEffect, useState, useContext} from 'react'
import { createRenderer } from 'react-dom/test-utils'
import GameContext from '../context/GameContext'
import CardComponent from '../componentes/CardComponent'
import { Card, suits } from '../componentes/cards'
import Player from '../componentes/players'
import '../style/lobby.css'

let players = []

const Lobby = () => {

    const {playerName, setPlayerName, isFindingGame, setIsFindingGame} = useContext(GameContext)

    const findGame = e => {
        e.preventDefault()
        setPlayerName(playerName)
        setIsFindingGame(true)

        const sleepInterval = Math.floor(Math.random() * 1)*1000
        setTimeout(() => {
            window.location = 'https://benbrackenbury.github.io/Gin-Rummy/#/play'
        }, sleepInterval)
    }

    return (
        <div className="Lobby">
            <h1>Online Gin-Rummy</h1>

            
            {isFindingGame ? (
                <h2 className="loading">Searching...</h2>
            ) : (
                <form onSubmit={e => findGame(e)} className="nameForm">
                    <label htmlFor="name">Enter your name</label>
                    <input type="text" name="name" id="nameField" placeholder="Name" value={playerName} onChange={e => {setPlayerName(e.target.value)}}/>
                    <input type="submit" value="Find Game"/>
                </form>
            )}

        </div>
    )
}

export default Lobby