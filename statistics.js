function Bot(client) {
    this.readyAt = "\nReady at: \n" + client.readyAt;
    this.status = "\nStatus: \n" + client.ws.status + "\n (active)\n";
    this.guildList = function() {
        var guilds = client.guilds.cache.array();
        return "\nGuild: \n" + guilds.length;
    }
    this.ping = "\nPing:\n " + client.ws.ping + "\nms\n";
    this.uptime = "\nUptime: \n" + client.uptime + "\nms\n";
    this.isBotObject = true;
}

function viewStats(Obj) {
    if (Obj.isBotObject) {
        return `\nStatistics:\n\n\n${Obj.readyAt}\n${Obj.status}\n${Obj.guildList()}\n${Obj.ping}\n${Obj.uptime}\n`;
    }
    else {
        return null;
    }
}

module.exports = {
    Bot: Bot,
    view: viewStats
}