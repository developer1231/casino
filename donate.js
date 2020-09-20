var ls = require("./ls");

function donateToUser(args, ifprofile, targetProfile, prefix, message) {
    if (args && args[0] && args[1] && typeof Number(args[1]) === "number") {
        var user = args[0];
        var donations = Number(args[1]);
    }
    else {
        return "\`Please specify a valid user and amount to donate to them.\`\nUse `" + prefix + "\`donate [user] [donation]` to continue\`.";
    }
    if (ifprofile && targetProfile && donations <= Number(ifprofile) && donations >= 1) {
        var donorBal = Number(ifprofile) - donations;
        var targetBal = Number(targetProfile) + donations;
        var donor = message.author.id + "profile";
        var target = user.id + "profile";
        var donorDonations = message.author.id + "donations";
        var totalDonations = Number(ls.get(donorDonations)) + donations;
        ls.set(donor, donorBal);
        ls.set(target, targetBal);
        ls.set(donorDonations, totalDonations);
        return `\`Generous \`${message.author.username}\`, you donated **$\`${Number(donations).toLocaleString()}\`** to \`${user.username}\`!\``;
    }
    else {
        return `\`Create a profile first with\` \`${prefix}create\`\n\`(Either you or the person you are donating does not have a profile creates!).\``;
    }
}

module.exports = {
    toUser: donateToUser
}