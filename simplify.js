var simp = {
    users: {
        getUser: function(messageAuthor) {
            return messageAuthor.username;
        },
        getTag: function(messageAuthor) {
            return messageAuthor.tag;
        },
        getRaw: {
            getUserID: function(messageAuthor) {
                return messageAuthor.id;
            },
            getDateCreated: function(obj, xinf) {
                return `${obj} was created on September 14th, 2020. ${xinf}`;
            },
            getCreator: function() {
                return "Awsome";
            }
        }
    }
}

module.exports = {
    simplify: simp,
    discrim: function(member) {
        return member.hasPermission("ADMINISTRATOR");
    }
}