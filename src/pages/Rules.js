import React, {useEffect, useState, useContext} from 'react'
import { useHistory } from "react-router-dom"
import { createRenderer } from 'react-dom/test-utils'
import GameContext from '../context/GameContext'
import CardComponent from '../componentes/CardComponent'
import { Card, suits } from '../componentes/cards'
import Player from '../componentes/players'
import '../style/rules.css'

const Rules = () => {
    const history = useHistory()

    const {playerName, setPlayerName, players, setPlayers, isFindingGame, setIsFindingGame} = useContext(GameContext)

    const next = e => {
        e.preventDefault()
        history.push("/lobby")
    }

    return (
        <div className="Rules">
            <h1>Online Gin-Rummy</h1>

            <main>
                <h2>Rules</h2>
                <p>
                    You will both have a hand of 7 cards! When it is your turn, 
                    pick up an unknown card from the facedown pile, or choose the 
                    card on the top of the face-up pile. You must then place a 
                    card from your hand face-up on the top of the pile, so as 
                    to always maintain a hand of 7 cards.
                </p>
                <p>
                    The aim of the game is to create a set of 3 and a set of 4 cards. 
                    One of the sets must be the same suit in chronological order, 
                    e.g. ‘8,9,10, J’, and the other must be the same value from each 
                    card, e.g. the Queen of Diamonds, Hearts, and Spades. It does 
                    not matter which set you choose to have 4 cards in. 
                </p>
                <p>
                Alternatively, players could win by collecting 7 cards in chronological 
                order of the same suit, e.g. '8, 9, 10, J, Q, K, A’ of spades.
                </p>
                <p>
                    Players take turns to pick up and replace cards from the pile until they 
                    have formed their sets. When a player has formed their sets they place 
                    their hand on the table face up - first to do this wins.
                </p>
            </main>

            <button onClick={next}>Continue</button>

        </div>
    )
}

export default Rules