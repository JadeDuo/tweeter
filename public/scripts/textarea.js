
$(document).ready(function() {

  const tweet = $("#tweet-text");
  
    tweet.on("keypress", function(event) {
      const keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode === 13) {
        tweet.blur();
        $("#addTweet").submit();
      }
      
      })

      
  
    
  
  });