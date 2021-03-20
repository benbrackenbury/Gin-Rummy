import React, {useEffect, useState, useContext} from 'react'
import { useHistory } from "react-router-dom"
import GameContext from '../context/GameContext'
import '../style/card.css'

const CardComponent = ({card, isFaceUp, player, isKnock=false, pile}) => {

    const [isFaceUpState, setIsFaceUpSate] = useState(false)
    const {discardPile, setDiscardPile, deck, setDeck, userPlayer, gameState, setGameState, players, currentCard, setCurrentCard} = useContext(GameContext)

    useEffect(() => {
        setIsFaceUpSate(isFaceUp)
    }, [])

    const mapToPNG = card => {
        let value
        switch (card.value) {
            case 1:
                value = 'A'
                break;

            case 11:
                value = 'J'
                break;

            case 12:
                value = 'Q'
                break;

            case 13:
                value = 'K'
                break;
        
            default:
                value = card.value
                break;
        }
        return `${value}${card.suit[0].toUpperCase()}.png`
    }

    const checkGinPlayer = () => {
        if (players[0].calcDeadwood == 0) {
            players[0].score += 25 + players[1].calcDeadwood()

            if (players[0].score >= 100) {
                alert('You win!')
                window.location = '/'
            } else {
                window.location = '/chat'
            }
        }
    }    

    const faceUpClicked = e => {
        if (player==null && gameState=='draw') {
            e.preventDefault()
            userPlayer.hand.push(card)
            let tmpPile = [...discardPile]
            tmpPile.splice(tmpPile.indexOf(card), 1)
            setDiscardPile(tmpPile)
            setGameState('discard')
        }

        if (player===userPlayer && gameState=='discard') {
            e.preventDefault()

            if (userPlayer.calcDeadwood() > 10) {
                let tmpPile = [...discardPile]
                tmpPile.unshift(card)
                setDiscardPile(tmpPile)
                userPlayer.hand.splice(userPlayer.hand.indexOf(card), 1)
                checkGinPlayer()
                setGameState('opponent')
            } else {
                //highlight knock and discard piles
                setGameState('knock-discard')
                setCurrentCard(card)
            }
        }

        if (pile.name=='discard' && gameState=='knock-discard') {
                let tmpPile = [...discardPile]
                console.log('currentCard', currentCard)
                tmpPile.unshift(currentCard)
                setDiscardPile(tmpPile)
                userPlayer.hand.splice(userPlayer.hand.indexOf(currentCard), 1)
                checkGinPlayer()
                setGameState('opponent')
        }
    }

    const faceDownClicked = e => {

        if (player==null && gameState=='draw') {
            e.preventDefault()
            userPlayer.hand.push(card)
            let tmpPile = [...deck]
            tmpPile.splice(tmpPile.indexOf(card), 1)
            setDeck(tmpPile)
            setGameState('discard')
        }

        if (isKnock && gameState=='knock-discard') {
            alert('knock')
        }
    }

    return (
        <>
            {card && (
                <div className="Card"
                    onClick={e => isFaceUpState ? faceUpClicked(e) : faceDownClicked(e)}
                    style={{
                        backgroundImage: isKnock ? `url('/card-images/knock.png')` : (
                            `url("${process.env.PUBLIC_URL + `/card-images/${isFaceUpState
                                ? mapToPNG(card) 
                                : 'blue_back.png'}`}")`
                        )
                    }}

                />
            )}
        </>
    )
}

export default CardComponent