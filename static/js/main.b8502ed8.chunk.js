(this["webpackJsonpGin-Rummy"]=this["webpackJsonpGin-Rummy"]||[]).push([[0],{24:function(e,t,a){e.exports=a(42)},28:function(e,t,a){},29:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){},41:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var n=a(3),c=a(0),r=a.n(c),s=a(14),i=a.n(s),l=a(6),o=a(2),u=(a(28),a(29),a(1)),d=(a(13),r.a.createContext({})),h=(a(37),function(e){var t=e.card,a=e.isFaceUp,s=e.player,i=e.isKnock,l=void 0!==i&&i,o=e.pile,h=Object(c.useState)(!1),m=Object(n.a)(h,2),f=m[0],p=m[1],v=Object(c.useContext)(d),b=v.discardPile,O=v.setDiscardPile,g=v.deck,j=v.setDeck,y=v.gameState,E=v.setGameState,w=v.currentCard,k=v.setCurrentCard,M=v.players;v.setPlayers;Object(c.useEffect)((function(){p(a)}),[]);var S=function(){0==M[0].calcDeadwood()&&(M[0].score+=25+M[1].calcDeadwood(),M[0].score>=100?(alert("You won by going Gin"),window.location="/#/"):(alert("You went Gin and gained ".concat(25+M[1].calcDeadwood()," points")),window.location="/#/chat")),0==M[1].calcDeadwood()&&(M[1].score+=25+M[0].calcDeadwood(),M[1].score>=100?(alert("".concat(M[1].name," went Gin and won")),window.location="/"):(alert("".concat(M[1].name," went Gin and gained ").concat(25+M[0].calcDeadwood()," points")),window.location="/#/chat"))};return r.a.createElement(r.a.Fragment,null,t&&r.a.createElement("div",{className:"Card",onClick:function(e){return f?function(e){if(S(),null==s&&"draw"==y){e.preventDefault(),M[0].hand.push(t);var a=Object(u.a)(b);a.shift(),O(a),M[0].calcDeadwood(),E("discard")}if(s===M[0]&&"discard"==y)if(e.preventDefault(),M[0].calcDeadwood()>10){var n=Object(u.a)(b);n.unshift(t),O(n),M[0].hand.splice(M[0].hand.indexOf(t),1),E("opponent")}else if(M[0].calcDeadwood()-(t.value<11?t.value:10)===0){var c=Object(u.a)(b);c.unshift(t),O(c),M[0].hand.splice(M[0].hand.indexOf(t),1),S()}else E("knock-discard"),k(t);if("discard"==o.name&&"knock-discard"==y){var r=Object(u.a)(b);r.unshift(w),O(r),M[0].hand.splice(M[0].hand.indexOf(w),1),E("opponent")}}(e):function(e){if(S(),null==s&&"draw"==y){e.preventDefault(),M[0].hand.push(t);var a=Object(u.a)(g);if(a.splice(a.indexOf(t),1),g.length<1){var n=Object(u.a)(b),c=n;n=[n[0]],c.forEach((function(e,t){e==n[0]&&c.splice(t,1)})),O(n)}j(a),E("discard")}if(l&&"knock-discard"==y){M[1].calcDeadwood(),M[0].possibleMelds.map((function(e){3==e.length&&M[1].deadwoodCards.map((function(t,a){e[0].value==e[1].value!=t.value&&(e[0].suit==e[1].suit!=t.suit||t.value!=e[0].value-1&&t.value!=e[2].value+1)||M[1].deadwoodCards.splice(a,1)}))}));var r=0;M[1].deadwoodCards.map((function(e){r+=e.value<11?e.value:10})),M[0].score+=r-M[0].calcDeadwood(),M[0].score>=100?(alert("You won by knocking!"),window.location="/#/"):(alert("You knocked and ".concat(r-M[0].calcDeadwood()>-1?"gained":"lost"," ").concat(Math.abs(r-M[0].calcDeadwood())," points")),window.location="/#/chat")}}(e)},style:{backgroundImage:l?"url('/card-images/knock.png')":'url("'.concat("/Gin-Rummy"+"/card-images/".concat(f?function(e){var t;switch(e.value){case 1:t="A";break;case 11:t="J";break;case 12:t="Q";break;case 13:t="K";break;default:t=e.value}return"".concat(t).concat(e.suit[0].toUpperCase(),".png")}(t):"purple_back.png"),'")')}}))}),m=a(7),f=function e(t,a){Object(m.a)(this,e),this.suit=null,this.value=0,this.suit=t,this.value=a},p={HEARTS:"hearts",CLUBS:"clubs",SPADES:"spades",DIAMONDS:"diamonds"},v=a(22),b=function(){function e(t){Object(m.a)(this,e),this.name="",this.score=0,this.hand=[],this.possibleMelds=[],this.bestMelds=[],this.discardPile=[],this.deck=[],this.deadwoodCards=[],this.deadwood=0,this.name=t}return Object(v.a)(e,[{key:"highestValueMeld",value:function(){var e=this,t=null,a=[];return this.possibleMelds.map((function(n,c,r){var s=n,i=!1,l=0;e.possibleMelds.map((function(e,t,n){c!=t&&e.map((function(e,t){a.push(e),s.includes(e)&&(i=!0)}))})),n.map((function(e,t){a.includes(e)||(l+=e.value<11?e.value:10)})),i||(l+=1e3),l>=0&&(t=n)})),t}},{key:"highestValueMeld2",value:function(){var e=this,t=0,a=0,n=[],c=[];return this.possibleMelds.map((function(r,s,i){var l=0;r.map((function(e){var t=!1;n.map((function(a){a.card.value==e.value&&a.card.suit==e.suit&&(t=!0)})),t?n.map((function(t){t.card.value==e.value&&t.card.suit==e.suit&&t.count++})):n.push({card:e,count:1}),l+=e.value<11?e.value:10})),n.map((function(e){e.count>1&&c.push(e.card)}));var o=r.filter((function(e){return c.includes(e)})),u=l/(o.length>0?o.length:1);u>t?(t=u,a=s):u==t&&e.bestMelds.push(r)})),this.possibleMelds[a]}},{key:"checkHandForSets",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3;this.possibleMelds=[];var a=Object(u.a)(this.hand),n=a.filter((function(e){return"hearts"==e.suit})),c=a.filter((function(e){return"diamonds"==e.suit})),r=a.filter((function(e){return"clubs"==e.suit})),s=a.filter((function(e){return"spades"==e.suit}));n.sort((function(e,t){return e.value-t.value})),c.sort((function(e,t){return e.value-t.value})),r.sort((function(e,t){return e.value-t.value})),s.sort((function(e,t){return e.value-t.value})),a=[].concat(Object(u.a)(n),Object(u.a)(c),Object(u.a)(r),Object(u.a)(s));for(var i=function(a){var n=[],c=0;e.hand.map((function(e){e.value==a&&(n.push(e),c++)})),c>=t&&e.possibleMelds.push(n)},l=1;l<14;l++)i(l);var o=0,d=[];a.map((function(n,c,r){if(c!=a.length-1){var s=r[c+1];s.value==n.value+1&&s.suit==n.suit?(o++,d.push(n),c==a.length-2&&o>=3&&(d.push(s),d.length>0&&e.possibleMelds.push(d))):(o>=t&&(d.push(n),d.length>0&&e.possibleMelds.push(d)),o=0,d=[])}}))}},{key:"filterMelds",value:function(){var e=this.highestValueMeld();this.bestMelds.push(e);var t=Object(u.a)(this.possibleMelds);t.map((function(a,n){e.map((function(e){a.includes(e)&&t.splice(n,1)}))})),this.possibleMelds=t}},{key:"getMelds",value:function(){for(this.bestMelds=[],this.checkHandForSets();this.possibleMelds.length>0;)this.filterMelds()}},{key:"calcDeadwood",value:function(){var e=this;this.deadwoodCards=[],this.getMelds();var t=0;return this.hand.map((function(a){var n=!1;e.bestMelds.map((function(e){e.includes(a)&&(n=!0)})),n||(t+=a.value<11?a.value:10,e.deadwoodCards.push(a))})),this.deadwood=t,t}},{key:"arrDiff",value:function(e,t){for(var a=[],n=[],c=0;c<e.length;c++)a[e[c]]=!0;for(c=0;c<t.length;c++)a[t[c]]?delete a[t[c]]:a[t[c]]=!0;for(var r in a)n.push(r);return n}},{key:"opponentTurn",value:function(){var e=this;if(this.getMelds(),0==this.calcDeadwood());else{this.checkHandForSets(2);var t,a,n=Object(u.a)(this.hand),c=this.discardPile[0];this.hand.push(c);var r=Object(u.a)(this.discardPile);r.splice(r.indexOf(c),1),this.getMelds(),t=this.possibleMelds.length,this.hand=Object(u.a)(n);var s=this.deck[0];this.hand.push(s);var i=Object(u.a)(this.deck);if(i.splice(i.indexOf(s),1),this.getMelds(),a=this.possibleMelds.length,this.hand=Object(u.a)(n),t>a){var l=this.discardPile[0];this.hand.push(l);var o=Object(u.a)(this.discardPile);o.splice(o.indexOf(l),1),this.discardPile=Object(u.a)(o)}else if(a>t){var d=this.deck[0];this.hand.push(d);var h=Object(u.a)(this.deck);h.splice(h.indexOf(d),1),this.deck=Object(u.a)(h)}else if(this.deck[0].value>this.discardPile[0].value){var m=this.discardPile[0];this.hand.push(m);var f=Object(u.a)(this.discardPile);f.splice(f.indexOf(m),1),this.discardPile=Object(u.a)(f)}else{var p=this.deck[0];this.hand.push(p);var v=Object(u.a)(this.deck);v.splice(v.indexOf(p),1),this.deck=Object(u.a)(v)}this.getMelds();var b,O,g,j=Object(u.a)(this.hand).filter((function(t){return!e.possibleMelds.flat().includes(t)})),y=0;j.forEach((function(e){e.value>y&&(y=e.value,b=e)})),this.hand.forEach((function(e,t){e.value==b.value&&e.suit==b.suit&&(O=t,g=e)})),this.discardPile.unshift(g),this.hand.splice(O,1)}return"draw"}}]),e}(),O=(a(38),a(39),function(){var e=Object(o.f)(),t=Object(c.useContext)(d),a=t.playerName,n=t.setPlayerName,s=(t.players,t.setPlayers),i=t.isFindingGame,l=t.setIsFindingGame;return r.a.createElement("div",{className:"Lobby"},r.a.createElement("h1",null,"Online Gin-Rummy"),i?r.a.createElement("h2",{className:"loading"},"Searching..."):r.a.createElement("form",{onSubmit:function(t){return function(t){t.preventDefault(),n(a),s([new b(a),new b("Player 2")]),l(!0);var c=1e3*Math.floor(1*Math.random());setTimeout((function(){e.push("/chat")}),c)}(t)},className:"nameForm"},r.a.createElement("label",{htmlFor:"name"},"Enter your name"),r.a.createElement("input",{type:"text",name:"name",id:"nameField",placeholder:"Name",value:a,onChange:function(e){n(e.target.value)}}),r.a.createElement("input",{type:"submit",value:"Find Game"})))}),g=function(){var e=Object(c.useState)([]),t=Object(n.a)(e,2),a=t[0],s=t[1],i=Object(c.useState)([]),l=Object(n.a)(i,2),o=l[0],m=l[1],v=Object(c.useState)(!1),b=Object(n.a)(v,2),O=b[0],g=b[1],j=Object(c.useContext)(d),y=j.gameState,E=j._setGameState,w=j.prevGameState,k=j.setPrevGameState,M=(j.playerName,j.setPlayerName,j.players),S=j.setPlayers,P=Object(c.useState)(),D=Object(n.a)(P,2),N=D[0],x=D[1],C=function(e){k(y),E(e)},G=Object(c.useRef)();return Object(c.useEffect)((function(){void 0!==M[1]?M.forEach((function(e){e.hand=[]})):window.location="/",function(){var e=[];Object.keys(p).map((function(t){for(var a=1;a<14;a++){var n=new f(t,a);e.push(n)}})),s(e)}(),setTimeout((function(){G&&G.current.click()}),100)}),[]),Object(c.useEffect)((function(){"opponent"==w&&(s(Object(u.a)(M[1].deck)),m(Object(u.a)(M[1].discardPile))),"opponent"==y&&setTimeout((function(){C(M[1].opponentTurn())}),Math.floor(3e3*Math.random())+1e3)}),[y]),Object(c.useEffect)((function(){M.forEach((function(e){e.discardPile=Object(u.a)(o),e.deck=Object(u.a)(a)}))}),[o,a]),Object(c.useEffect)((function(){if(a.length<1&&"opponent"==y){var e=Object(u.a)(o),t=e;e=[e[0]],t.forEach((function(a,n){a==e[0]&&t.splice(n,1)})),s(t),m(e)}}),[a,o]),r.a.createElement(d.Provider,{value:{discardPile:o,setDiscardPile:m,deck:a,setDeck:s,userPlayer:M[0],gameState:y,setGameState:C,currentCard:N,setCurrentCard:x,players:M,setPlayers:S}},r.a.createElement("div",{className:"Home"},!O&&r.a.createElement("button",{onClick:function(e){e.preventDefault(),g(!0),function(){for(var e=!0;e;){for(var t=Object(u.a)(a),n=0;n<20;n++){for(var c=Object(u.a)(t),r=Math.floor(Math.random()*c.length-1);-1==r;)r=Math.floor(Math.random()*c.length-1);var i=c[r];M[n%2].hand.push(i),c.splice(r,1),t=Object(u.a)(c)}s(t.sort((function(){return.5-Math.random()})));for(var l=Object(u.a)(t),d=Math.floor(Math.random()*l.length-1);-1==d;)d=Math.floor(Math.random()*l.length-1);m([l[d]]),l.splice(d,1),t=Object(u.a)(l),s(t.sort((function(){return.5-Math.random()}))),e=!1,t.filter((function(e){return o.includes(e)})).length>=1&&(e=!0),t.filter((function(e){return M[0].hand.includes(e)})).length>=1&&(e=!0),t.filter((function(e){return M[1].hand.includes(e)})).length>=1&&(e=!0),M[0].hand.filter((function(e){return M[1].hand.includes(e)})).length>=1&&(e=!0),o.filter((function(e){return M[0].hand.includes(e)})).length>=1&&(e=!0),o.filter((function(e){return M[1].hand.includes(e)})).length>=1&&(e=!0)}C("draw")}()},id:"dealBtn",ref:G},"Loading"),M[1]&&r.a.createElement("h2",null,M[1].name," Score: ",M[1].score),r.a.createElement("div",{className:"cardList"},M[1]&&M[1].hand.map((function(e,t){return r.a.createElement(h,{card:e,isFaceUp:!1,player:M[1],pile:{name:"opponentHand",ref:M[1].hand}})}))),r.a.createElement("br",null),r.a.createElement("div",{className:"middleDeck ".concat("opponent"==y?"greyedOut":"")},r.a.createElement("div",{className:"cardWrapper"},r.a.createElement(h,{card:new f("hearts",null),isFaceUp:!1,player:null,isKnock:!0})),r.a.createElement("div",{className:"cardWrapper"},r.a.createElement(h,{card:a[0],isFaceUp:!1,player:null,pile:{name:"deck",ref:a}})),r.a.createElement("div",{className:"cardWrapper"},r.a.createElement(h,{card:o[0],isFaceUp:!0,player:null,pile:{name:"discard",ref:o}}))),r.a.createElement("br",null),r.a.createElement("div",{className:"cardList ".concat("opponent"==y?"greyedOut":"")},M[0]&&M[0].hand.map((function(e,t){return r.a.createElement(h,{card:e,isFaceUp:!0,player:M[0],pile:{name:"hand",ref:M[0].hand}})}))),r.a.createElement("h2",{className:"gameState"},y?function(e){switch(e){case"draw":return"Draw Card";case"discard":return"Discard";case"opponent":return"".concat(M[1].name,"'s turn");default:return e}}(y):""),M[0]&&r.a.createElement("div",{className:"player1Score"},r.a.createElement("h2",null,M[0].name," Score: ",M[0].score),r.a.createElement("div",{style:{flexGrow:1}}),r.a.createElement("h2",null,"Deadwood: ",M[0].calcDeadwood(),"/10"))))},j=a(18),y=a.n(j),E=a(23),w=(a(41),function e(t,a,n){Object(m.a)(this,e),this.sender=t,this.score=a,this.text=n,this.timestamp=Date.now()}),k=function(){var e=Object(o.f)(),t=Object(c.useContext)(d),a=t.playerName,s=(t.setPlayerName,t.players),i=(t.setPlayers,t.isFindingGame,t.setIsFindingGame,Object(c.useState)([])),l=Object(n.a)(i,2),h=l[0],m=l[1],f=Object(c.useState)(""),p=Object(n.a)(f,2),v=p[0],b=p[1],O=Object(c.useState)(!0),g=Object(n.a)(O,2);g[0],g[1];Object(c.useEffect)((function(){void 0===s[1]&&(window.location="/")}),[]);var j=function(e){for(var t="object"!=typeof e?JSON.parse(e):e,a="playerName, score, messageBody, messageTimestamp, playerScore\r\n",n=0;n<t.length;n++){var c="";for(var r in t[n])""!=c&&(c+=","),c+=t[n][r];a+=c+"\r\n"}return a};Object(c.useEffect)((function(){}),[h]);var k=function(){var e=Object(E.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"http://community.dur.ac.uk/e.c.stanton/studies/GinRummy/ginrummy.php",e.next=3,fetch("http://community.dur.ac.uk/e.c.stanton/studies/GinRummy/ginrummy.php",{method:"POST",mode:"cors",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({results2send:j(h)})});case 3:e.sent;case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){var t=2,a=0,n=setInterval((function(){if(0==t&&0==a)k(),e.push("/play"),clearInterval(n);else if(document.getElementById("timer").innerHTML="Round starting in ".concat(t," minutes and ").concat(a," seconds"),--a<0&&(t--,a=59),a%10==0){var c=0;void 0!==s&&(c=s[1].score);var r=new w("Fake User",c,"Fake user message");m((function(e){return[].concat(Object(u.a)(e),[r])}))}}),1e3)}),[]),r.a.createElement(d.Provider,{value:{playerName:a}},r.a.createElement("div",{className:"Chat"},r.a.createElement("h1",null,"Online Gin-Rummy"),r.a.createElement("h2",null,"Chat"),r.a.createElement("h2",{id:"timer"},"..."),r.a.createElement("div",{className:"message-area"},r.a.createElement("ul",null,h.map((function(e){return r.a.createElement("div",{className:"message ".concat(e.sender===a?"ownMessage":"")},r.a.createElement("h3",null,e.sender),r.a.createElement("p",null,e.text))}))),r.a.createElement("div",{className:"spacer"}),r.a.createElement("form",{onSubmit:function(e){return function(e){e.preventDefault();var t=0;void 0!==s&&(t=a==s[0].name?s[0].score:s[1].score);var n=new w(a,t,v);m([].concat(Object(u.a)(h),[n])),b("")}(e)}},r.a.createElement("textarea",{type:"text",name:"message",id:"message-box",placeholder:"Message",value:v,onChange:function(e){return function(e){e.preventDefault(),b(e.target.value)}(e)}}),r.a.createElement("input",{type:"submit",value:"Send",disabled:""===v})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var M=function(){var e=Object(c.useState)(null),t=Object(n.a)(e,2),a=t[0],s=t[1],i=Object(c.useState)(""),u=Object(n.a)(i,2),h=u[0],m=u[1],f=Object(c.useState)("Player 1"),p=Object(n.a)(f,2),v=p[0],b=p[1],j=Object(c.useState)(!1),y=Object(n.a)(j,2),E=y[0],w=y[1],M=Object(c.useState)([]),S=Object(n.a)(M,2),P=S[0],D=S[1];return r.a.createElement(d.Provider,{value:{gameState:a,_setGameState:s,prevGameState:h,setPrevGameState:m,playerName:v,setPlayerName:b,players:P,setPlayers:D,isFindingGame:E,setIsFindingGame:w}},r.a.createElement(l.a,{basename:"/Gin-Rummy"},r.a.createElement("div",{className:"container"},r.a.createElement(o.c,null,r.a.createElement(o.a,{exact:!0,path:"/"},r.a.createElement(O,null)),r.a.createElement(o.a,{exact:!0,path:"/chat"},r.a.createElement(k,null)),r.a.createElement(o.a,{exact:!0,path:"/play"},r.a.createElement(g,null))))))};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[24,1,2]]]);
//# sourceMappingURL=main.b8502ed8.chunk.js.map