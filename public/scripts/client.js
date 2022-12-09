/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //hides the error container immediately on load, only appears when required
  $("#error-container").hide();

  //creates the HTML using data from json array into tweet, used in renderTweets. Uses timeago to convert to blurry timestamp.
  const createTweetElement = function(data) {
    const relTime = timeago.format(data.created_at);
    const $tweet = $(`
    <article class="tweet">
      <header>
        <div>
          <img src=${data.user.avatars}>
          <span>${data.user.name}</span>
        </div>  
        <span>${data.user.handle}</span>
      </header>
      <p class="content">${toSafeText(data.content.text)}</p>
      <footer class="tweet-footer">
        <span>${relTime}</span>
        <div>
          <i class="fa-solid fa-flag icon"></i>
          <i class="fa-solid fa-retweet icon"></i>
          <i class="fa-solid fa-heart icon"></i>
        </div>
      </footer>    
    </article>
    `);
    return $tweet;
  };
  //loops through all tweets given by load tweets, and creates the html for all tweets in /tweets DB array
  const renderTweets = function(tweets) {
    $(".display-tweet").empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.display-tweet').prepend($tweet);
    }
  };
  //recieves array of tweets from the /tweet DB array, and passes to renderTweets
  const loadTweets = function() {
    $.get("/tweets", function(response) {
      renderTweets(response);
    });
  };
  //replaces the submit action on tweet button to serialize data and add it to /tweets DB array, and resets page to display all tweets + newly created tweet.
  const $form = $("#addTweet");
  $form.on("submit", function(event) {
    event.preventDefault();
    //-error-handling--
    //if tweet is empty
    if ($("#tweet-text").val().length === 0) {
      $("#error-container").slideDown();
      $("#error-container").children().text("Your tweet is empty! add some characters and try again!");
      return;
    }
    //if tweet exceeds 140 characters
    if ($("#tweet-text").val().length > 140) {
      $("#error-container").slideDown();
      $("#error-container").children().text("Your tweet is looking a little chonky, 140 chars max!");
      return;
    }
    //other non valid data entered (null, undefined())
    if (!$("#tweet-text").val()) {
      $("#error-container").slideDown();
      $("#error-container").children().text("Something went wrong, please re-enter your tweet, and try again!");
      return;
    }
    //performs the translation into URL-encoded string
    const data = $form.serialize();
    //make a post request with serialized data to add to /tweets DB array. Resets form, counter and error container to default values.
    $.post("/tweets", data, function(response) {
      $("#tweet-text").val("");
      $(".counter").text(140);
      $("#error-container").slideUp();
      loadTweets();
    });
  });
  //calls the initial function sequence to display existing tweets when loaded or refreshed.
  loadTweets();
});

//escape helper function for converting content to basic text
const toSafeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};