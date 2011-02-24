
//document.write('ACCESS:' + ACCESS_TOKEN + '\n');

window.fbAsyncInit = function() {
    FB.init({
        appId   : APP_ID,
                session : SESSION_JSON, // don't refetch the session when PHP already has it
                status  : true, // check login status
                cookie  : true, // enable cookies to allow the server to access the session
                xfbml   : true // parse XFBML
                });

    // whenever the user logs in, we refresh the page
    FB.Event.subscribe('auth.login', function() {
            window.location.reload();
        });
};

(function() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
}());


function getAuthToken() {
    //if it's already in the url, get it.
    //otherwise, send to fb oauth to get the token.

    var params = getFragment();
    var auth_token = params['auth_token'];

    if (auth_token) {
        return auth_token;
    } else {
        $.get('https://graph.facebook.com/oauth/access_token');
    }
}

function getMutualFriends(me_id, you_id) {
    var query_string = OLD_API + '/' + 'friends.getMutualFriends' + '?' +
        'target_uid=' + you_id + '&' +
        'source_uid=' + me_id + '&' +
        'access_token=' + ACCESS_TOKEN;

    //$.get(query_string);
    document.write( "Getting mut friends (" + query_string + " for" + me_id + ', ' + you_id + '\n');
};


//helper to get param pairs from query string
function getParams() {
    var params = {};
    var url = parent.document.URL;

    if (url.match(/\?/)) {
        var pairs = url.replace(/#.*$/, '').replace(/^.*\?/, '').split(/[&;]/);
        for (var p in pairs) {
            var keyPair = pairs[p].split(/=/);
            params[keyPair[0]] = keyPair[1];
        }
    }
    return params;
}

function getFragment() {
    var params = {};
    var url = parent.document.URL;

    if (url.match(/\#/)) {
        var pairs = url..replace(/^.*\#/, '').split(/[&;]/);
        for (var p in pairs) {
            var keyPair = pairs[p].split(/=/);
            params[keyPair[0]] = keyPair[1];
        }
    }
    return params;
}
    
    
