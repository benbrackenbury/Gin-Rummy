// import React, {useContext} from 'react'
// import GameContext from '../context/GameContext'

class Player {
    name = ''
    score = 0
    scores = []
    hand = []
    possibleMelds = []
    bestMelds = []
    discardPile = []
    deck = []
    deadwoodCards = []
    deadwood = 0
    prolificID = ''

    constructor(name, prolificID=null) {
        this.name = name
        this.prolificID = prolificID
    }

    highestValueMeld() {
        let bestMeldValue = 0
        let bestMeld = null
        let otherCards = []
        this.possibleMelds.map((meld, index, melds) => {
            let cardsInMeld = meld
            let cardContested = false
            let meldValue = 0
            this.possibleMelds.map((meld2, index2, melds2) => {
                if (index != index2)
                {
                    meld2.map((card, cardIndex) => {
                        //if card is in cards in meld
                        otherCards.push(card)
                        if (cardsInMeld.includes(card)) {
                            cardContested = true
                        }
                    })
                }
            })
            meld.map((card2, cardIndex2) => {
                if (!otherCards.includes(card2))
                {
                    meldValue+= card2.value < 11 ? card2.value : 10
                }
            })
            if(!cardContested)
            {
                meldValue += 1000
            }
            if (meldValue >= bestMeldValue)
            {
                bestMeld = meld
            }
        })
        return bestMeld
    }

    highestValueMeld2() {
        let highestEffeciency = 0
        let highestEfficiencyIndex = 0

        let cardCounts = []
        let contestedCards = []

        this.possibleMelds.map((meld, index, melds) => {
            let sum = 0
            meld.map(card => {
                
                let isInArray = false
                cardCounts.map(obj => {
                    if (obj.card.value == card.value && obj.card.suit == card.suit) {
                        isInArray = true
                    }
                })

                if (isInArray) {
                    cardCounts.map(obj => {
                        if (obj.card.value == card.value && obj.card.suit == card.suit) {
                            obj.count++
                        }
                    })
                } else {
                    cardCounts.push({card, count: 1})
                }
                sum+= card.value < 11 ? card.value : 10
            })

            cardCounts.map(obj => {
                if (obj.count > 1) contestedCards.push(obj.card)
            })

            let intersection = meld.filter(value => contestedCards.includes(value))

            // //console.log('intersection', intersection)


            let efficiency = sum / (intersection.length>0 ? intersection.length : 1)
            //console.log('meld', meld)
            // //console.log(efficiency, contestedCards, meld)
            // //console.log({efficiency, highestEffeciency})
            if (efficiency > highestEffeciency) {
                highestEffeciency = efficiency
                highestEfficiencyIndex = index
            } else if (efficiency == highestEffeciency) {
                //TODO: the problem is here
                this.bestMelds.push(meld)
                // this.possibleMelds.splice(index, 1)
            }
        })

        let bestMeld = this.possibleMelds[highestEfficiencyIndex]
        return bestMeld
    }

    checkHandForSets(max=3) {
        this.possibleMelds = []
        let sortedHand = [...this.hand]

        let hearts = sortedHand.filter(card => card.suit == 'hearts')
        let diamonds = sortedHand.filter(card => card.suit == 'diamonds')
        let clubs = sortedHand.filter(card => card.suit == 'clubs')
        let spades = sortedHand.filter(card => card.suit == 'spades')

        hearts.sort((card1, card2) => card1.value - card2.value)
        diamonds.sort((card1, card2) => card1.value - card2.value)
        clubs.sort((card1, card2) => card1.value - card2.value)
        spades.sort((card1, card2) => card1.value - card2.value)

        sortedHand = [...hearts, ...diamonds, ...clubs, ...spades]

        for (let i=1; i<14; i++) {
            let tmpMeld = []
            let j = 0
            this.hand.map(card => {
                if (card.value == i) {
                    tmpMeld.push(card)
                    j++
                }
            })
            if (j>=max) {
                this.possibleMelds.push(tmpMeld)
            }
        }

        let j = 0
        let tmpMeld = []
        sortedHand.map((card, index, cards) => {
            if (index != sortedHand.length-1) {
                let nextCard = cards[index+1]
                if (nextCard.value == card.value + 1 && nextCard.suit == card.suit) {
                    j++
                    tmpMeld.push(card)
                    if (index == sortedHand.length-2 && j>=3) {
                        tmpMeld.push(nextCard)
                        if (tmpMeld.length > 0) {
                            this.possibleMelds.push(tmpMeld)
                        }
                    }
                } else {
                    if (j>=max) {
                        tmpMeld.push(card)
                        if (tmpMeld.length > 0) {
                            this.possibleMelds.push(tmpMeld)
                        }
                    }
                    j = 0
                    tmpMeld = []
                }
            }

        })
    }

    filterMelds() {
        let bestMeld = this.highestValueMeld()
        this.bestMelds.push(bestMeld)

        let possibleMeldsTmp = [...this.possibleMelds]

        //console.log('possible melds', this.possibleMelds)

        possibleMeldsTmp.map((meld, index) => {
            bestMeld.map(card => {
                if(meld.includes(card)) {
                    possibleMeldsTmp.splice(index, 1)
                    //console.log('FILTER', {meld, bestMelds: this.bestMelds})
                }
            })

        })

        
        this.possibleMelds = possibleMeldsTmp
        //console.log('post purge', this.possibleMelds)
    }

    getMelds() {
        this.bestMelds = []
        this.checkHandForSets()
        while (this.possibleMelds.length > 0) {
            this.filterMelds()
        }
    }

    calcDeadwood() {
        this.deadwoodCards = []
        this.getMelds()
        let value = 0

        this.hand.map(card => {
            let isCardInMeld = false
            this.bestMelds.map(meld => {
                if (meld.includes(card)) {
                    isCardInMeld = true
                }
            })
            if (!isCardInMeld) {
                value+= card.value<11 ? card.value : 10
                this.deadwoodCards.push(card)
            }
        })
        this.deadwood = value
        return value
    }


    arrDiff(a1, a2) {

        var a = [], diff = [];
    
        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }
    
        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }
    
        for (var k in a) {
            diff.push(k);
        }
    
        return diff;
    }

    opponentTurn() {
        this.getMelds()

        if (this.calcDeadwood() == 0) {
            //
        } else {
            this.checkHandForSets(2)

            let discardLength, deckLength = 0

            // discard pile
            let previousHandState = [...this.hand]
            let discardCard = this.discardPile[0]
            this.hand.push(discardCard)
            let tmpPile = [...this.discardPile]
            tmpPile.splice(tmpPile.indexOf(discardCard), 1)
            this.getMelds()
            discardLength = this.possibleMelds.length
            this.hand = [...previousHandState]

            // deck pile
            let deckCard = this.deck[0]
            this.hand.push(deckCard)
            let tmpPile2 = [...this.deck]
            tmpPile2.splice(tmpPile2.indexOf(deckCard), 1)
            this.getMelds()
            deckLength = this.possibleMelds.length
            this.hand = [...previousHandState]

            if (discardLength > deckLength) {
                let discardCard = this.discardPile[0]
                this.hand.push(discardCard)
                let tmpPile = [...this.discardPile]
                tmpPile.splice(tmpPile.indexOf(discardCard), 1)
                this.discardPile = [...tmpPile]
            } else if (deckLength > discardLength) {
                let deckCard = this.deck[0]
                this.hand.push(deckCard)
                let tmpPile2 = [...this.deck]
                tmpPile2.splice(tmpPile2.indexOf(deckCard), 1)
                this.deck = [...tmpPile2]
            } else {
                //same
                if (this.deck[0].value > this.discardPile[0].value) {
                    let discardCard = this.discardPile[0]
                    this.hand.push(discardCard)
                    let tmpPile = [...this.discardPile]
                    tmpPile.splice(tmpPile.indexOf(discardCard), 1)
                    this.discardPile = [...tmpPile]
                } else {
                    let deckCard = this.deck[0]
                    this.hand.push(deckCard)
                    let tmpPile2 = [...this.deck]
                    tmpPile2.splice(tmpPile2.indexOf(deckCard), 1)
                    this.deck = [...tmpPile2]
                }
            }

            this.getMelds()
            let deadwood = [...this.hand].filter(card => !this.possibleMelds.flat().includes(card))
            let highestVal = 0
            let highestValCard
            deadwood.forEach(card => {
                if (card.value > highestVal) {
                    highestVal = card.value
                    highestValCard = card
                }
            })

            let cardToDiscardIndex
            let cardToDiscard
            this.hand.forEach((card, index) => {
                if (card.value == highestValCard.value && card.suit == highestValCard.suit) {
                    cardToDiscardIndex = index
                    cardToDiscard = card
                }
            })

            this.discardPile.unshift(cardToDiscard)
            this.hand.splice(cardToDiscardIndex, 1)

        }
        
        return 'draw'
    }
}

export default Player