<?php

require 'facebook-php-sdk/src/facebook.php';

// Create our Application instance (replace this with your appId and secret).
$facebook = new Facebook(array(
  'appId'  => '162844173761910',
  'secret' => '3d7fc0b761fe0c19c1febb38f34727c2',
  'cookie' => true,
));

// We may or may not have this data based on a $_GET or $_COOKIE based session.
//
// If we get a session here, it means we found a correctly signed session using
// the Application Secret only Facebook and the Application know. We dont know
// if it is still valid until we make an API call using the session. A session
// can become invalid if it has already expired (should not be getting the
// session back in this case) or if the user logged out of Facebook.
$session = $facebook->getSession();

$me = null;
// Session based API call.
if ($session) {
  try {
    $uid = $facebook->getUser();
    $me = $facebook->api('/me');
  } catch (FacebookApiException $e) {
    error_log($e);
  }

  try {
      $friends = $facebook->api('/me/friends');
      $first_id = $friends['data'][0]['id'];
      $api_path = '/' . $first_id . '/friends';
      $first_fr = $facebook->api($api_path);
      
  } catch (FacebookApiException $e) {
      error_log($e);
  }
      
}

// login or logout url will be needed depending on current user state.
if ($me) {
  $logoutUrl = $facebook->getLogoutUrl();
} else {
  $loginUrl = $facebook->getLoginUrl();
}

?>
<!doctype html>
<html xmlns:fb="http://www.facebook.com/2008/fbml">
  <head>
    <title>Friend Categories</title>
     <script type="text/javascript">
       var OLD_API = 'https://api.facebook.com/method/';
       var APP_ID = '<?php echo $facebook->getAppId(); ?>';
       var URL = 'http://anorwell.com/fbgraph.example.php';
       var AUTH = 'https://www.facebook.com/dialog/oauth?response_type=token&client_id=' +
           APP_ID + '&redirect_uri='+ URL;
       var SESSION_JSON = '<?php echo json_encode($session); ?>';

       var ACCESS_TOKEN = '<?php echo $session['access_token']; ?>';
    </script>

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
    <script type="text/javascript" src="local.js"></script>
    <style>
      body {
        font-family: 'Lucida Grande', Verdana, Arial, sans-serif;
      }
      h1 a {
        text-decoration: none;
        color: #3b5998;
      }
      h1 a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <!--
      We use the JS SDK to provide a richer user experience. For more info,
      look here: http://github.com/facebook/connect-js
    -->
    <div id="fb-root"> </div>



    <h1><a href="example.php">php-sdk</a></h1>

    <?php if ($me): ?>
    <a href="<?php echo $logoutUrl; ?>">
      <img src="http://static.ak.fbcdn.net/rsrc.php/z2Y31/hash/cxrz4k7j.gif">
    </a>
    <?php else: ?>
    <div>
      Using JavaScript &amp; XFBML: <fb:login-button></fb:login-button>
    </div>
    <div>
      Without using JavaScript &amp; XFBML:
      <a href="<?php echo $loginUrl; ?>">
        <img src="http://static.ak.fbcdn.net/rsrc.php/zB6N8/hash/4li2k73z.gif">
      </a>
    </div>
    <?php endif ?>

    <h3>Session</h3>
    <?php if ($me): ?>
    <pre><?php print_r($session); ?></pre>

    <h3>You</h3>
    <img src="https://graph.facebook.com/<?php echo $uid; ?>/picture">
    <?php echo $me['name']; ?>

    <h3>Your User Object</h3>

    <pre><?php print_r($me); ?></pre>
    <pre><?php
    $my_id = $me['id'];
    foreach ($friends['data'] as $friend) {
        print_r($friend);
        $friend_id = $friend['id'];
        ?>
            <script type="text/javascript">
                 getMutualFriends(<?php echo $my_id ?>,<?php echo $friend_id ?>);
            </script>
    <?php }            

?></pre>
    
    <?php else: ?>
    <strong><em>You are not Connected.</em></strong>
    <?php endif ?>

  </body>
</html>
         