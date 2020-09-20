
var fix;
function setFix(prefix) {
    fix = prefix;
}

var ext = require("./external");
function extCommands() {
    var extList = "";
    Object.keys(ext.commands).forEach(function(key) {
        var commandStuff = ext.commands[key].name.split("");
        var commandLatter = commandStuff.slice(1, (commandStuff.length + 1)).join("");
        var commandFormer = commandStuff[0].toUpperCase();
        var name = commandFormer + commandLatter;
        var usage = ext.commands[key].usage(fix);
        var desc = ext.commands[key].desc;
        extList = extList + `
            ${name} - 
            \`${usage}\`
            ${desc}


        `;
    });
    return extList;    
}

var profileStarterAmount1 = 50; 
var battleshipTurnAmount = 25;
function getHelpCommands(parm) {
    var main = `
    **Kings Family's Commands List**
    ~~-----------------~~
    Kings Family Casino -
    \`********\`
    Welcome to the King's family Casino!
    Enjoy your stay and begin gambling!
    Don't be afraid to contact the admins or owner in case of questions/problems!
    These are all the commands to use on this bot!
    Now, quit reading and have fun gambling!

    Fetch Prefix -
    \`/fetch prefix\`
    Sends you the bot's current prefix.

    Casino Help -
    \`${fix}casino <help>\`
    Alternate form of Kings Family's Casino command, but uses the current prefix.

    Casino Reset Balance -
    \`${fix}reset <balance>\`
    Resets casino balance to $0, in case any bugs involving casino profile occur.

    Roulette -
    \`${fix}roulette [bet]\`
   *Casino game*. Spins a roulette wheel with 38 numbered slots, returning green for 0, and red or black for the rest. Earn money for guessing the right color.

    Double -
    \`${fix}double [bet]\`
    *Casino game*. Gives you a chance to double the bet money you specify and collect it.

    Coinflip -
    \`${fix}coin [bet] [heads/tails]\`
    *Casino game*. Gives you a 50-50 chance to win bet money based on a coinflip.

    Dice Roll -
    \`${fix}dice [bet]\`
    *Casino game*. Rolls two dice. If you roll dual ONEs, you gain 3 times your bet. If you roll any other matching numbers, you gain 7 times your bet.

    Prefix -
    \`${fix}prefix <new prefix>\`
    Sets a new bot prefix for the current erver, if you have admin permissions.

    Casino Profile -
    \`${fix}profile\`
    Views your current balance {and donation levels}.


    `
    var main2 = `
    ** **
    ** **
    Jackpot -
    \`${fix}jackpot [bet]\`
    *Casino game*. Starts or joins a jackpot game. Multiplayer; anyone can join, winner takes all.

    Jackpot (end) -
    \`${fix}jackpot <end>\`
    Ends any currently running jackpot game in the guild. Only the creator of the game or an administrator can do this.

    Battleship (start) -
    \`${fix}bs [bet]\`
    *Casino game*. Starts a battleship game with the specified bet. Play for a chance to win 20 TIMES YOUR BET!

    Battleship (guess) -
    \`${fix}bsguess [row] [column]\`
    Guesses the coordinates of a battleship in a 10x10 game board in an already started game.

    Blackjack -
    \`${fix}blackjack [bet]\`
    *Casino game*. Starts a blackjack card game against the computer where the highest card wins, with some special exceptions.

    Hit -
    \`${fix}hit\`
    Used in games like blackjack and double to continue playing.

   Stand -
    \`${fix}stand\`
    Used in games like blackjack and double to stop playing and attempt to collect the bet money.
    ** **
    ** **
    `
    var main3 = `

    Statistics -
    \`${fix}stats\` or \`${fix}statistics\`
    Views bot statistics, including ping, uptime, and number of guilds.

    Hangman -
    \`${fix}hm [start/end/guess]\`
    *Casino game*. Starts a guild-based hangman game, ends it, or guesses a letter in it, respectively. All participants gain $5000 dollars each upon victory.

    Casino Create -
    \`${fix}create\`
    Creates a casino profile (necessary to play casino games).

    Casino Delete -
    \`${fix}delete\`
    Deletes your casino account.

    
    `; 
    var ext = `
    
     ` 
    if (parm == "main") {
        return main;
    }
    else if (parm == "ext") {
        return ext;
    }
    else if (parm == "main2") {
        return main2;
    }
    else if (parm == "main3") {
        return main3;
    } 
}


module.exports = {
    profileStarterAmount: profileStarterAmount1,
    help: getHelpCommands,
    setPrefix: setFix,
    battleshipTurnMax: battleshipTurnAmount
}