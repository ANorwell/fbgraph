console.log = function(){};

//the (global) friend data that will be constructed to send to server.
var gFrData;

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
    $('#fb-root').append(e);


}());

$(function() {
        //set up buttons
        console.log("Setting buttons");
        $("button", "#processfriends").button();
    });
        

//Get mutual friends for friendlist

function getMutualFriends(me_id, you_id) {
    var query_string = OLD_API + '/' + 'friends.getMutualFriends' + '?' +
        'target_uid=' + you_id + '&' +
        'source_uid=' + me_id + '&' +
        'access_token=' + ACCESS_TOKEN;

    //$.get(query_string);
    document.write( "Getting mut friends (" + query_string + " for" + me_id + ', ' + you_id + '\n');
};

function processFriends() {
    console.log("Called processfriends");
    for (var div in $('#friends div')) {
        console.log(div);
        //append friendlist selectors

        //call mutual-friend lookup
    }
}





//MISC

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
    
    
