const { Channel } = require("discord.js");
var ls = require("./ls");
var simpjs = require("./simplify");

function jackpotStart(args, ifprofile, prefix, message) {
    var guildIdentifier = message.guild.id + "jackpotGame";
    var guildId = guildIdentifier;
    var bet = Number(args[0]);
    if (!bet || isNaN(args[0]) || args[0] != " " || bet < 1 || bet > Number(ifprofile)) {
        return `Please specify a valid bet that is less than or equal to your current balance. Check with ${prefix}balance.`; 
    }
    else if (!ifprofile) {
        return `Create a profile first with ${prefix}create`;
    }
    if (ls.exist(guildId)) {
      
        if (ls.getObj(guildId).isEnabled) {
            
            var jackpotObj = ls.getObj(guildId);
            var isAlreadyIn = jackpotObj.participants.includes(message.author.id);
            if (isAlreadyIn) {
               
                var index = jackpotObj.participants.indexOf(message.author.id);
                jackpotObj.bets[index] += bet;
                var total = jackpotObj.bets.reduce((a,b) => Number(a) + Number(b), 0);
                ls.setObj(guildId, jackpotObj);
                ls.set(message.author.id + "profile", Number(ls.get(message.author.id + "profile")) - Number(bet));
                return `${message.author.username}, you added $${bet} more to the jackpot! Total jackpot value: **$${total}**`;
            }
            else {
                
                var jackpotObj = ls.getObj(guildId);
                jackpotObj.participants.push(message.author.id);
                jackpotObj.bets.push(bet);
                var total = jackpotObj.bets.reduce((a,b) => Number(a) + Number(b), 0);
                ls.setObj(guildId, jackpotObj);
                ls.set(message.author.id + "profile", Number(ls.get(message.author.id + "profile")) - Number(bet));
                return `${message.author.username}, you joined the jackpot with $${bet}! Total jackpot value: **$${total}**`;
            }
        }
        else {
            
            console.log(`Error 203: jackpotObj.isEnabled should be set to true, but is not defined.`);
        }
    }
    else {
       
        var jackpotObj = {
            isEnabled: true,
            participants: [],
            bets: []
        }
        jackpotObj.participants.push(message.author.id);
        jackpotObj.bets.push(bet);
        ls.setObj(guildId, jackpotObj);
        ls.set(message.author.id + "profile", Number(ls.get(message.author.id + "profile")) - Number(bet));
        return `${message.author.username}, you created a new jackpot with **$${bet}**\nDo \`${prefix}jackpot [bet]\` to join for a chance to win over **$${Number(bet).toLocaleString()}**!\nEx: \`${prefix}jackpot 2500\` enters the jackpot with $2500, giving the winner a chance to earn over $${Number(bet) + 2500}!`;
    }
}

function jackpotEnd(message) {
    var jackpotObj = ls.getObj(message.guild.id + "jackpotGame");
    if (simpjs.discrim(message.member) || jackpotObj.participants[0] == message.author.id) {
        //End the jackpot game
        var total = jackpotObj.bets.reduce((a,b) => Number(a) + Number(b), 0);
        var jackpotLength = jackpotObj.participants.length;
        if (jackpotLength == 1) {
            ls.set(message.author.id + "profile", Number(ls.get(message.author.id + "profile")) + Number(jackpotObj.bets[jackpotObj.participants.indexOf(message.author.id)]));
            ls.remove(message.guild.id + "jackpotGame");
            return `Sorry ${message.author.username}, nobody joined your jackpot game. Your money has been refunded!`;
        }
        else {
            var randWinner = Math.floor(Math.random() * jackpotLength);
            var winner = jackpotObj.participants[randWinner];
            ls.set(winner + "profile", Number(ls.get(winner + "profile")) + Number(total));
            var winnerUsername = "<@" + winner + ">";
            
            ls.remove(message.guild.id + "jackpotGame");
            return `Lucky ${winnerUsername}, you won the jackpot with a gain of **$${total}!**`;
        }
    }
    else {
        
        return `${message.author.username}, **you cannot end the jackpot**, as you are neither the creator of the jackpot session nor an administrator in this guild.`;
    }
}

module.exports = {
    start: jackpotStart,
    end: jackpotEnd
}