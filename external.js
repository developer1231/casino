

const externalCommands = {
    extExample: {
        name: "example",
        desc: "An example command to be used as a template for external developers who want to contribute to this project.",
        usage: function(prefix) {
           return prefix + "example [argument 1] [argument 2] <optional argument 3>";
        },
        get: function(args, message, secondaryCache) {
            var example = require("./ext-example"); 
            return example.example2("World", message, secondaryCache[0]); 
        }
    },
    templateExample: {
        name: "command",
        desc: "A functionless template command for external developers.",
        usage: function(prefix) {
            return prefix + "command <entirely optional argument>"
        },
        get: function(args) {
            
        }
    }
}

module.exports = {
    commands: externalCommands
}

