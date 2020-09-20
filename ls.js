

module.exports = {
    set: function(key, value) {
        return localStorage.setItem(key, value);
    },
    get: function(key) {
        return localStorage.getItem(key);
    },
    setObj: function(key, obj) {
        
        return localStorage.setItem(key, JSON.stringify(obj));
    },
    getObj: function(key) {
        
        return JSON.parse(localStorage.getItem(key));
    },
    exist: function(key) {
        if (localStorage.getItem(key)) {
            return true;
        }
        else {
            return false;
        }
    },
    remove: function(key) {
        return localStorage.removeItem(key);
    },
    clear: function() {
        return localStorage.clear();
    },
    append:function(key,value){ return localStorage.setItem(key,localStorage.getItem(key)+value); },
    renameKey:function(key,newk){ let value=localStorage.getItem(key);return localStorage.setItem(newk,value); }
}

