import React, {useEffect, useState, useContext, useRef} from 'react'
import { createRenderer } from 'react-dom/test-utils'
import { useHistory } from "react-router-dom"
import GameContext from '../context/GameContext'
import CardComponent from '../componentes/CardComponent'
import { Card, suits } from '../componentes/cards'
import Player from '../componentes/players'
import '../style/home.css'
import Lobby from './Lobby'

const Home = () => {
    const history = useHistory()
    const [deck, setDeck] = useState([])
    const [discardPile, setDiscardPile] = useState([])
    const [hasDealt, setHasDealt] = useState(false)
    const {gameState, _setGameState, prevGameState, setPrevGameState, playerName, setPlayerName, players, setPlayers} = useContext(GameContext)
    
    const [currentCard, setCurrentCard] = useState()

    const setGameState = state => {
        setPrevGameState(gameState)
        _setGameState(state)
    }

    const dealBtnRef = useRef();

    const gameStateMap = state => {
        switch (state) {
            case 'draw':
                return 'Draw Card'
                break;

            case 'discard':
                return 'Discard'
                break;

            case 'opponent':
                return `${players[1].name}'s turn`
                break;
        
            default:
                return state
                break;
        }
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

    const deal = () => {
        let duplicates = true
        while (duplicates) {
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

            setDeck(otherTmpDeck.sort(() => .5 - Math.random()))

            duplicates = false

            if (otherTmpDeck.filter(card => discardPile.includes(card)).length >= 1) {
                duplicates = true
            }

            if (otherTmpDeck.filter(card => players[0].hand.includes(card)).length >= 1) {
                duplicates = true
            }

            if (otherTmpDeck.filter(card => players[1].hand.includes(card)).length >= 1) {
                duplicates = true
            }

            if (players[0].hand.filter(card => players[1].hand.includes(card)).length >= 1) {
                duplicates = true
            }

            if (discardPile.filter(card => players[0].hand.includes(card)).length >= 1) {
                duplicates = true
            }

            if (discardPile.filter(card => players[1].hand.includes(card)).length >= 1) {
                duplicates = true
            }

        }


        
        setGameState('draw')        
    }

    useEffect(() => {
        if (players[1] !== undefined) {
            players.forEach(player => {
                player.hand = []
            })
        } else {
            history.push(`/`)
        }

        generateDeck()

        setTimeout(() => {
            if (dealBtnRef) {
                dealBtnRef.current.click()
            }
        }, 100)

    }, [])


    useEffect(() => {
        // let i = 0
        // while (gameState == 'opponent' && i<2) {
        //     setTimeout(//console.log('opponent'), 1000)
        //     i++
        // }

        // //console.log('deck', deck)
        //console.log('discardPile', discardPile)
        // //console.log('player1', players[0].hand)
        // //console.log('player2', players[1].hand)


        if (players !== []) {
            //console.log('player 1 deadwood', players[0].calcDeadwood())
            //console.log('player 2 deadwood', players[1].calcDeadwood())
            //console.log('player 1 possible melds', players[0].possibleMelds)
            //console.log('player 1 best melds', players[0].bestMelds)
            //console.log('player 2 possible melds', players[1].possibleMelds)
            //console.log('player 2 best melds', players[1].bestMelds)
        }


        if (prevGameState == 'opponent') {
            setDeck([...players[1].deck])
            setDiscardPile([...players[1].discardPile])

            //console.log('setDeck', deck)
            //console.log('setDIscard', discardPile)
        }

        if (gameState == 'opponent') {
            setTimeout(() => {
                setGameState(
                    players[1].opponentTurn()
                )
            }, Math.floor(Math.random() * 3000) + 1000)
        }
    }, [gameState])

    // useEffect(() => {
    //     //console.log('rerender')
    // }, [deck])

    useEffect(() => {
        players.forEach(player => {
            player.discardPile = [...discardPile]
            player.deck = [...deck]
        })
    }, [discardPile, deck])

    useEffect(() => {
        //run out of cards in discrad pile
        if (deck.length < 1 && gameState=='opponent') {
            //console.log('prevGameSTate', prevGameState)
            let tmpDiscard = [...discardPile]
            let tmpDeck = tmpDiscard
            tmpDiscard = [tmpDiscard[0]]

            tmpDeck.forEach((c, index) => {
                if (c == tmpDiscard[0]) {
                    tmpDeck.splice(index, 1)
                }
            })

            setDeck(tmpDeck)
            setDiscardPile(tmpDiscard)
        }
    }, [deck, discardPile])

    return (
        <GameContext.Provider value={{discardPile, setDiscardPile, deck, setDeck, userPlayer: players[0], gameState, setGameState, currentCard, setCurrentCard, players, setPlayers}}>
            <div className="Home">
                {!hasDealt && (
                    <button onClick={e => {
                        e.preventDefault()
                        setHasDealt(true)
                        deal()
                    }} id="dealBtn" ref={dealBtnRef}>Loading</button>
                )}

                {players[1] && (
                    <h2>{players[1].name} Score: {players[1].score}</h2>
                )}

                <div className="cardList">
                    {players[1] && players[1].hand.map((card, key) => {
                        // <li key={key}>{card.value == 1 ? 'ACE' : card.value}, {card.suit}</li>
                        return (<CardComponent card={card} isFaceUp={false} player={players[1]} pile={{name: 'opponentHand', ref: players[1].hand}}/>)
                    })}
                </div>

                <br/>
                
                <div className={`middleDeck ${gameState=='opponent' ? 'greyedOut' : ''}`}>

                    <div className="cardWrapper">
                        {/* <img className="Card" src={process.env.PUBLIC_URL + "/card-images/knock.png"} isKnock={true}/> */}
                        <CardComponent card={new Card('hearts', null)} isFaceUp={false} player={null} isKnock={true}/>
                    </div>

                    <div className="cardWrapper">
                        <CardComponent card={deck[0]} isFaceUp={false} player={null} pile={{name: 'deck', ref: deck}}/>
                    </div>

                    <div className="cardWrapper">
                        <CardComponent card={discardPile[0]} isFaceUp={true} player={null} pile={{name: 'discard', ref: discardPile}}/>
                    </div>
                </div>

                <br/>

                <div className={`cardList ${gameState=='opponent' ? 'greyedOut' : ''}`}>
                    {players[0] && players[0].hand.map((card, key) => {
                        // <li key={key}>{card.value == 1 ? 'ACE' : card.value}, {card.suit}</li>
                        return (<CardComponent card={card} isFaceUp={true} player={players[0]} pile={{name: 'hand', ref: players[0].hand}}/>)
                    })}
                </div>

                <h2 className="gameState">{gameState ? gameStateMap(gameState) : ''}</h2>

                {players[0] && (
                    <div className="player1Score">
                        <h2>{players[0].name} Score: {players[0].score}</h2>
                        <div style={{flexGrow: 1}}/>
                        <h2>Deadwood: {players[0].calcDeadwood()}/10</h2>
                    </div>
                )}

            </div>
        </GameContext.Provider>
    )
}

export default Home