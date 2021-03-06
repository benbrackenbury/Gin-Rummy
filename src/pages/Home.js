import React, {useEffect, useState, useContext} from 'react'
import { createRenderer } from 'react-dom/test-utils'
import GameContext from '../context/GameContext'
import CardComponent from '../componentes/CardComponent'
import { Card, suits } from '../componentes/cards'
import Player from '../componentes/players'
import '../style/home.css'
import Lobby from './Lobby'

let players = []

const Home = () => {
    const [deck, setDeck] = useState([])
    const [discardPile, setDiscardPile] = useState([])
    const [hasDealt, setHasDealt] = useState(false)
    const {gameState, _setGameState, prevGameState, setPrevGameState, playerName, setPlayerName} = useContext(GameContext)
    
    const [currentCard, setCurrentCard] = useState()

    const setGameState = state => {
        setPrevGameState(gameState)
        _setGameState(state)
    }

    const generateDeck = () => {
        let cards = []
        Object.keys(suits).map(suit => {
            for (let value=1; value<14; value++) {
                let newCard = new Card(suit, value)
                cards.push(newCard)
            }
        })
        setDeck(cards)
    }

    const createPlayers = () => {
        players = [
            new Player('Player 1'),
            new Player('Player 2')
        ]
    }

    const deal = () => {
        let otherTmpDeck = [...deck]

        for (let i=0; i<20; i++) {
            let tmpDeck = [...otherTmpDeck]
            let cardIndex = Math.floor(Math.random() * tmpDeck.length-1)
            while (cardIndex == -1) {
                cardIndex = Math.floor(Math.random() * tmpDeck.length-1)
            }
            let card = tmpDeck[cardIndex]
            players[(i%2)].hand.push(card)
            tmpDeck.splice(cardIndex, 1)
            otherTmpDeck = [...tmpDeck]
        }

        setDeck(otherTmpDeck.sort(() => .5 - Math.random()))

        let tmpDeck = [...otherTmpDeck]
        let cardIndex = Math.floor(Math.random() * tmpDeck.length-1)
        while (cardIndex == -1) {
            cardIndex = Math.floor(Math.random() * tmpDeck.length-1)
        }
        setDiscardPile([tmpDeck[cardIndex]])
        tmpDeck.splice(cardIndex, 1)
        otherTmpDeck = [...tmpDeck]

        setGameState('draw')
    }

    useEffect(() => {
        generateDeck()
        createPlayers()
        // deal()
    }, [])


    useEffect(() => {
        // let i = 0
        // while (gameState == 'opponent' && i<2) {
        //     setTimeout(console.log('opponent'), 1000)
        //     i++
        // }

        if (prevGameState == 'opponent') {
            setDeck([...players[1].deck])
            setDiscardPile([...players[1].discardPile])
        }

        if (gameState == 'opponent') {
            setTimeout(() => {
                setGameState(
                    players[1].opponentTurn()
                )
            }, 1000)
        }
    }, [gameState])

    // useEffect(() => {
    //     console.log('rerender')
    // }, [deck])

    useEffect(() => {
        players.forEach(player => {
            player.discardPile = [...discardPile]
            player.deck = [...deck]
        })
    }, [discardPile, deck])

    return (
        <GameContext.Provider value={{discardPile, setDiscardPile, deck, setDeck, userPlayer: players[0], gameState, setGameState, players, currentCard, setCurrentCard}}>
            <div className="Home">
                {!hasDealt && (
                    <button onClick={e => {
                        e.preventDefault()
                        setHasDealt(true)
                        deal()
                    }}>Deal</button>
                )}

                <h2>Name: {playerName || "null"}; {gameState || 'null'}, deadwood: {players[0] && players[0].calcDeadwood()}</h2>

                <div className="cardList">
                    {players[1] && players[1].hand.map((card, key) => (
                        // <li key={key}>{card.value == 1 ? 'ACE' : card.value}, {card.suit}</li>
                        <CardComponent card={card} isFaceUp={false} player={players[1]} pile={{name: 'opponentHand', ref: players[1].hand}}/>
                    ))}
                </div>

                <br/>
                
                <div className={`middleDeck ${gameState=='opponent' ? 'greyedOut' : ''}`}>

                    <div className="cardWrapper">
                        <img className="Card" src="/Gin-Rummy/card-images/knock.png" alt="knock"/>
                        {/* <CardComponent card={deck[0]} isFaceUp={false} player={null} isKnock={true}/> */}
                    </div>

                    <div className="cardWrapper">
                        <CardComponent card={deck[0]} isFaceUp={false} player={null} pile={{name: 'deck', ref: deck}}/>
                    </div>

                    <div className="cardWrapper">
                        {
                            discardPile.length > 0
                                ? (<CardComponent card={discardPile[0]} isFaceUp={true} player={null} pile={{name: 'discard', ref: discardPile}}/>)
                                : <CardComponent card={deck[0]} isFaceUp={true} player={null} pile={{name: 'discard', ref: deck[0]}}/>
                        }
                    </div>
                </div>

                <br/>

                <div className={`cardList ${gameState=='opponent' ? 'greyedOut' : ''}`}>
                    {players[0] && players[0].hand.map((card, key) => (
                        // <li key={key}>{card.value == 1 ? 'ACE' : card.value}, {card.suit}</li>
                        <CardComponent card={card} isFaceUp={true} player={players[0]} pile={{name: 'hand', ref: players[0].hand}}/>
                    ))}
                </div>

            </div>
        </GameContext.Provider>
    )
}

export default Home