
const express = require('express');
const app = express();


app.use(express.static('public'));
app.get('/', function(request, response) {
  response.send("Running botserver");
});
const listener = app.listen(process.env.PORT, function() {
  console.log('Kings Family listening on port ' + listener.address().port);
});
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./ls');
  var ls = require("./ls");
}


const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "/";


function ifProfile(authorid) {
  if (ls.get(authorid + "profile") && Number(ls.get(authorid + "profile")) >= -10) {
      var profile = ls.get(authorid + "profile");
      }
  else if (Number(ls.get(authorid + "profile")) < -10) {
    var profile = false;         
  }
  else {
   var profile = false; 
  }
  return profile;
}

client.on('guildCreate', guild => {
    guild.channels.get(guild.channels.find("name", "general").id).send("Thanks for adding Kings Family to your guild! Use the command !casino help to get started.");
  guild.createRole({
    name: "Casino",
    color: "#593695"
  }).then(role => guild.member(client.user).addRole(role)).catch(console.error);
});

client.on('ready', () => {
    console.log('Kings Family is up and running!');
    client.user.setActivity('Kings Family', { type: 'PLAYING', url: 'AWESOME CASINO GAMES!' });
});

client.on('message', message => {
  try {
   var splitter = message.content.replace(" ", ";:splitter185151813367::");
    var splitted = splitter.split(";:splitter185151813367::");
  var prefix;
    
    if (ls.get(message.guild.id + "prefix")) {
        prefix = ls.get(message.guild.id + "prefix");
        }
      else {
         ls.set(message.guild.id + "prefix", "/");
          prefix = "/";
      }
  var fixRegExp = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  constants.setPrefix(prefix);
  var re = new RegExp(fixRegExp);
  var command = splitted[0].replace(re, "");
  if (splitted[1]) {
    var args = splitted[1].split(" ");
  }
  else {
   var args = false; 
  }
  
  if (message.content == "/fiverrcasino") {
      message.author.send(constants.help("main"));
      message.author.send(constants.help("main2"));
      message.author.send(constants.help("main3"));
      message.author.send(constants.help("ext"));
  }
  else if (message.content == "/fetch prefix") {
    message.channel.send(`The prefix for this server is ${prefix}`);
  }
  if (message.author.bot) {
     return false; 
  }
  var works = false;
  var pColor = message.content.toLowerCase();
  var asyncUser = require("./asyncUser");
  if ((pColor == "green" || pColor == "red" || pColor == "black") && asyncUser.getUserObj(message.author).awaitRoulette) {
    command = "rouletteSpin";
    works = true;
  }
  else if (command == "rouletteSpin") {
    command = "casino";
    works = true;
  }
  if ((!splitted[0] || !splitted[0].match(prefix)) && !works) {
    return false;
   
  }
  if (ls.get(message.author.id + "profile") && Number(ls.get(message.author.id + "profile")) >= -10) {
      ls.set(message.author.id + "profile", Number(ls.get(message.author.id + "profile")) + 1);
      var profile = ls.get(message.author.id + "profile");
      }
  else if (Number(ls.get(message.author.id + "profile")) < -10) {
    var profile = false;         
  }
  else {
     var profile = constants.profileStarterAmount; 
  }
  
  var simpjs = require("./simplify");
  
  switch (command) {
    case "casino":
        message.author.send(constants.help("main"));
        message.author.send(constants.help("main2"));
        message.author.send(constants.help("main3"));
        message.author.send(constants.help("ext"));
      break;
    case "reset":
        ls.set(message.author.id + "profile", 0);
        profile = 0;
        message.channel.send("Balance reset to 0");
      break;
    case "roulette":
      if (message.channel.id == '756816422130286623'){
        var roulette = require("./roulette");
        message.channel.send(roulette.specifyBet(args, ifProfile(message.author.id), prefix, message));
      }
      break;
    case "rouletteSpin":
      if (message.channel.id == '756816422130286623'){
        var roulette = require("./roulette");
        message.channel.send(roulette.spin(message.content, ifProfile(message.author.id), prefix, message));
      }
      break;
    case "jackpot":
        var jackpot = require("./jackpot");
        if (args[0] == "end") {
          message.channel.send(jackpot.end(message));
        }
        else {
          message.channel.send(jackpot.start(args, ifProfile(message.author.id), prefix, message));
        }
      break;
    case "bs":
      if (message.channel.id == '756816266538516480'){
        var battleship = require("./battleship");
        message.channel.send(battleship.start(args, ifProfile(message.author.id), prefix, message));
      break;
      }
    case "bsguess":
      if (message.channel.id == '756816266538516480'){
        var battleship = require("./battleship");
        message.channel.send(battleship.guess(args, message));
      }
      break;
    case "double":
      if (message.channel.id == '756816350449500240'){
        var double = require("./double");
        if (ls.exist(message.author.id + "doubleGame")) {
          throw "GameExistenceError: User already has a game running!\nAt server.js:154:5\nAt discord.js\nAt client.bot.Fiverr_Casino";
        }
        else {
          ls.setObj(message.author.id + "doubleBetAmount", args);
          message.channel.send(double.dble(args, ifProfile(message.author.id), prefix, message));
        }}
      break;
    case "coin":
      if (message.channel.id == '756816296301166595'){
        var coin = require("./coinflip");
        message.channel.send(coin.flip(args, ifProfile(message.author.id), prefix, message));
      }
      break;
    case "dice":
      if (message.channel.id == '756816324444815421'){
        var dice = require("./dice");
        message.channel.send(dice.roll(args, ifProfile(message.author.id), prefix, message));
      }
      break;
    case "user:all":
        message.channel.send(simpjs.simplify.users.getUser(message.author));
        message.channel.send(simpjs.simplify.users.getRaw.getUserID(message.author));
        message.channel.send(simpjs.simplify.users.getTag(message.author));
        
      break;
    case "about":
      message.channel.send(`Created by Awsome#6366, for Kings Family's server!`);
    break;
    case "prefix":
      if (simpjs.discrim(message.member)) {
        var nPref = args[0];
        if (nPref.length > 1) {
          
          message.channel.send("Error LengthException: Prefixes can only be at max one character long.");
        }
        else if (!nPref) {
          
          message.channel.send(`**Usage of ${prefix}prefix**\n\n \`n${prefix}prefix [new prefix character]\`\n__Ex:__\`\`\`${prefix}prefix ?\`\`\`\nThe shown example will set the prefix to ?`);
        }
        else {
          
          ls.set(message.guild.id + "prefix", nPref);
          prefix = nPref;
          message.channel.send(`Set the server's prefix to ${nPref}. Use \`/fetch prefix\` to identify this guild's current prefix.`);
        }
      }
      else {
        
        message.channel.send("Error PermissionError: You do not have the `ADMINISTRATOR` permission required to do this.");
      }
    break;
    case "guess":
        throw "CommandUtilizationError: This command does not exist yet!";
      break;
    case "stats":
    case "statistics":
        var statistics = require("./statistics");
        var Bot = new statistics.Bot(client);
        message.channel.send(statistics.view(Bot));
      break;
    case "play":
        var music = require("./music");
        message.channel.send(music.play([args.join(" "), process.env.YT_API], message, false));
      break;
    case "stop":
        var music = require("./music");
        message.channel.send(music.stop(message));
      break;
    case "loop":
        var music = require("./music");
        music.loop(message.author.id, message);
      break;
    case "queue":
        var music = require("./music");
        message.channel.send(music.getQueue(message));
      break;
    case "hm":
      if (message.channel.id == '756816384964427818'){
        var hm = require("./hangman");
        message.channel.send(hm.do(args, ifProfile(message.author.id), prefix, message));
      }
      break;
    case "blackjack":
      if (message.channel.id == '756807110620217374'){
        var blackjack = require("./blackjack");
        if (ls.exist(message.author.id + "blackjackGame")) {
          throw "GameExistenceError: User already has a game running!\nAt server.js:201:5\nAt discord.js";
        }
        else {
          
          message.channel.send(blackjack.start(args, ifProfile(message.author.id), prefix, message));
        }}
      break;
    case "hit":
      
        var blackjack = require("./blackjack");
        var double = require("./double");
        if (ls.exist(message.author.id + "blackjackGame")) {
          message.channel.send(blackjack.hit(message.author, message, prefix));
        }
        
        else if (ls.exist(message.author.id + "doubleGame")) {
          message.channel.send(double.hit(prefix, message, ifProfile(message.author.id)));
        }
        else {
          throw "GameExistenceError: User does not have a blackjack or double game running.\nAt server.js:224:15\nAt discord.js";
        }
      break;
    case "stand":
      
        var blackjack = require("./blackjack");
        var double = require("./double");
        if (ls.exist(message.author.id + "blackjackGame")) {
          message.channel.send(blackjack.stand(message));
        }
        else if (ls.exist(message.author.id + "doubleGame")) {
          message.channel.send(double.stand(message));
        }
        else {
          throw "GameExistenceError: User does not have a blackjack or double game running.\nAt server.js:235:15\nAt discord.js";
      }
      break;
    case "donate":
        var donate = require("./donate");
        var receiver = message.mentions.users.first();
        if (!receiver) {
          message.channel.send("\`Please specify a valid user and amount to donate to them.\nUse\` `" + prefix + "donate [user] [donation]` \`to continue.\nExample:\` `" + prefix + "donate @Awsome#6366 5000`");
        }
        else if (receiver.id == message.author.id) {
          message.channel.send("\`You cannot donate to yourself.\`");
        }
        else {
          message.channel.send(donate.toUser([receiver, args[1]], ifProfile(message.author.id), ifProfile(receiver.id), prefix, message));
        }
      break;
    case "profile":
      if (ls.get(message.author.id + "profile") && profile) {
        var donations = 0;
        if (ls.get(message.author.id + "donations")) {
          donations = ls.get(message.author.id + "donations");
        }
        message.channel.send(`${message.author.username} has $${Number(profile).toLocaleString()}.\n\`Amount Donated: $\`${Number(donations).toLocaleString()}.`);
      }
      else {
         message.channel.send(`Use ${prefix}create to create a casino profile.`); 
      }
      break;
    case "balance":
      if (ls.get(message.author.id + "profile") && profile) {
        message.channel.send(`${message.author.username}\` has $\`${Number(profile).toLocaleString()}. \` Keep grinding fellow gambler!\``);
      }
      else {
         message.channel.send(`Use ${prefix}create to create a casino profile.`); 
      }
      break;
    case "create":
      if (ls.get(message.author.id + "profile") && profile) {
        message.channel.send("You already have a casino profile.");
      }
      else {
       profile = constants.profileStarterAmount;
       ls.set(message.author.id + "profile", profile);
        message.channel.send(`Created a profile for ${message.author.username} with a beginning amount of $50.`);
      }
      break;
    case "delete":
      if (ls.get(message.author.id + "profile") <= -1) {
         message.channel.send("Account deleted.");
          ls.set(message.author.id + "profile", -100);
      }
      else {
         message.channel.send("Are you sure you want to delete your casino account? Type `" + prefix + "delete` again to delete your account."); 
        ls.set(message.author.id + "profile", -5);
      }
      break;
    default:
      
  }
  }
  catch(err) {
    console.log(`Errors found:\n\`\`\`${err}\nAt ${err.stack}\`\`\``);
  }
});

client.login("");