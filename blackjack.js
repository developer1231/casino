

var ls = require("./ls");
var rand = require("./random");
var Discord = require('discord.js');

function ToInteger(card) {
    if (card == "A") {
        return 11;
    }
    else if (card == "base") {
        return 0;
    }
    else if (card == "J" || card == "Q" || card == "K") {
        return 10;
    }
    else {
        return Number(card);
    }
}

function aceCheck(value, total) {
    if (total + value > 21 && value == 11) {
        return 1;
    }
    else {
        return value;
    }
}

function Card(value) {
    this.toInteger = ToInteger(value[0]);
    this.val = value[0];
    this.suite = value[1];
    
}

function randCard() {
    var randCardInt = rand.num(1, 20);
    var randSuit = rand.num(0, 3);
    var suites = [":spades:", ":hearts:", ":diamonds:", ":clubs:"];
    var fullCollection = ["A", "A", "2", "2", "3", "4", "5", "6", "7", "8", "9", "9", "9", "9", "10", "J", "J", "Q", "Q", "K", "K"];
        
    
        
    return [fullCollection[randCardInt - 1], suites[randSuit]];
}

function arrCardCalc(arr) {
    var sum = 0;
    var iterations = 0;
    for (var x in arr) {
        sum += arr[iterations].toInteger;
        iterations += 1;
    }
    return [sum, iterations];
}

function endGame(user) {
    var userLsId = user.id + "blackjackGame";
    ls.remove(userLsId);
}

function userHit(user, message, prefix) {
    var cardsObj = ls.getObj(user.id + "blackjackGame");
    var card = new Card(randCard());
    var total = arrCardCalc(cardsObj.userTotal);
    var newTotal = total[0] + aceCheck(card.toInteger, total[0]);
    var userLS = user.id + "profile";
    var bet = Number(cardsObj.bet);
    message.channel.send(`${user.username} drew ${card.val + " " + card.suite}`);
    if (newTotal > 21) {
        
    
        
        var loss = Number(ls.get(userLS)) - (bet);
        ls.set(userLS, loss);
        endGame(user);
        channel.send(`${user.username}\` busted; Croupier wins, **\`${user.username} \`loses**.`);
    }
    else if (newTotal == 21 && total[1] == 1) {
        
        var gain = Number(ls.get(userLS)) + (bet * 2);
        ls.set(userLS, gain);
        endGame(user);
        channel.send(`${user.username} has blackjack; ${user.username}\` wins, doubled the winning amount**!\``);
        
    }
    else {
        
        cardsObj.userTotal.push(card);
        ls.setObj(user.id + "blackjackGame", cardsObj);
        channel.send(`${user.username}, \`hit or stand?\n ${prefix}hit\` or \`${prefix}stand\``);
    }
}


function compHit(user, message) {
    var cardsObj = ls.getObj(user.id + "blackjackGame");
    var card = new Card(randCard());
    var userTotal = arrCardCalc(cardsObj.userTotal);
    var compTotal = arrCardCalc(cardsObj.compTotal);
    var newTotal = compTotal[0] + aceCheck(card.toInteger, compTotal[0]);
    var userLS = user.id + "profile";
    var bet = Number(cardsObj.bet);
    message.channel.send(`\`Dealer drew \`${card.val + " " + card.suite}`);
    if (newTotal > 21) {
        
        var gain = Number(ls.get(userLS)) + (bet);
        ls.set(userLS, gain);
        endGame(user);
        return `\`Dealer busted; **\`${user.username}\` wins**!\``;
    }
    else if (newTotal >= 17) {
        
        if (newTotal == 21 && compTotal[1] == 1) {
            
            var loss = Number(ls.get(userLS)) - (bet);
            ls.set(userLS, loss);
            endGame(user);
            return `\`Dealer has blackjack; Dealer wins, **\`${user.username}\` loses**.\``;
        }
        else if (newTotal > userTotal[0]) {
            
            var loss = Number(ls.get(userLS)) - (bet);
            ls.set(userLS, loss);
            endGame(user);
            return `\`Dealer stands with\` ${newTotal}\`; Dealer wins, **\`${user.username}\` loses**.\``;
        }
        else if (newTotal == userTotal[0]) {
            
            endGame(user);
            return `\`Dealer stands with\` ${newTotal}\`; **It's a tie**.\``;
        }
        else {
            
            var gain = Number(ls.get(userLS)) + (bet);
            ls.set(userLS, gain);
            endGame(user);
            return `\`Dealer stands with\` ${newTotal}; **${user.username} \`wins**!\``;
        }
    }
    else {
        
        cardsObj.compTotal.push(card);
        ls.setObj(user.id + "blackjackGame", cardsObj);
        return compHit(user, message);
    }
}

function createCardCollection(user, bet) {
    var cardsObj = {
        userTotal: [],
        compTotal: [],
        bet: bet
    }
    var userBase = new Card(randCard());
    var compBase = new Card("base");
    cardsObj.userTotal.push(userBase);
    cardsObj.compTotal.push(compBase);
    ls.setObj(user.id + "blackjackGame", cardsObj);
}

function startGame(args, ifprofile, prefix, message) {
    if (ifprofile && args[0] && typeof Number(args[0]) === "number" && (Number(args[0]) <= Number(ifprofile))) {
        createCardCollection(message.author, args[0]);
        var starterCard = ls.getObj(message.author.id + "blackjackGame").userTotal[0];
        return `${message.author.username} \`started a new blackjack game with $\`${args[0]}.\n${message.author.username} \`has\` ${starterCard.val + " " + starterCard.suite}.\nDo \`${prefix}hit\` or \`${prefix}stand\``;
    }
    else if (!ifprofile) {
        return `\`Create a profile first with\` \`${prefix}create\``;
    }
    else {
        return "\`Please specify a valid bet.\`" + `\nEx: \`${prefix}blackjack 500\` \`starts a game with $500 at stake.\``;
       
    }
}

function userStand(message) {
    message.channel.send(`${message.author} \`stands with:\` ${arrCardCalc(ls.getObj(message.author.id + "blackjackGame").userTotal)[0]}.`);
    return compHit(message.author, message);
}


module.exports = {
    start: startGame,
    stand: userStand,
    hit: userHit
}
