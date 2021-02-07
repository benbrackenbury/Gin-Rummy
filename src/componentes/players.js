class Player {
    name = ''
    score = 0
    hand = []
    possibleMelds = []
    bestMelds = []

    constructor(name) {
        this.name = name
    }

    highestValueMeld() {
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
                sum+= card.value<11 ? card.value : 10
            })

            cardCounts.map(obj => {
                if (obj.count > 1) contestedCards.push(obj.card)
            })

            let intersection = meld.filter(value => contestedCards.includes(value))

            // console.log('intersection', intersection)


            let efficiency = sum / (intersection.length>0 ? intersection.length : 1)
            // console.log(efficiency, contestedCards, meld)
            if (efficiency > highestEffeciency) {
                highestEffeciency = efficiency
                highestEfficiencyIndex = index
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
        possibleMeldsTmp.map((meld, index) => {
            bestMeld.map(card => {
                if(meld.includes(card)) {
                    possibleMeldsTmp.splice(index, 1)
                }
            })
        })

        this.possibleMelds = possibleMeldsTmp
    }

    getMelds() {
        this.bestMelds = []
        this.checkHandForSets()
        while (this.possibleMelds.length > 0) {
            this.filterMelds()
        }
    }

    calcDeadwood() {
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
            }
        })

        return value
    }

    endRound() {
        alert('end')
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
            this.endRound()
        } else {
            this.checkHandForSets(2)
            console.log('robotHand', this.hand)
            console.log('melds', this.possibleMelds)

            
            // let difference = this.arrDiff(this.hand, this.possibleMelds)
            let difference = [...this.hand].filter(card => !this.possibleMelds.flat().includes(card));
            console.log(difference)
        }
        
        return 'draw'
    }
}

module.exports = Player