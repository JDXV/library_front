
var Cookie = {
    setCookie: function(key, val, dias) {
        var d = new Date();
        d.setTime(d.getTime() + (dias * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = key + "=" + val + ";" + expires + ";path=/";
    },
    getCookie: function(key) {
        var name = key + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    checkCookie: function() {
        var user = this.getCookie("username");
        if (user !== "") {
            alert("Welcome again " + user);
        } else {
            user = prompt("Please enter your name:", "");
            if (user !== "" && user !== null) {
                this.setCookie("token", user, 365);
            }
        }
    }
}

export default Cookie;