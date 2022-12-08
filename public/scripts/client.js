/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $("#error-container").hide()
//creates the HTML using data from json array into tweet
  const createTweetElement = function(data) {
    const relTime = timeago.format(data.created_at)
    
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
    `)

    return $tweet;
  }
  //loops through all tweets any displays them without refresh
  const renderTweets = function(tweets) {
    $(".display-tweet").empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.display-tweet').prepend($tweet);
    }
  }
  //submits and adds new tweet without refresh
  const $form = $("#addTweet")
  $form.on("submit", function(event) {
    event.preventDefault();
    //if tweet is empty
    if ($("#tweet-text").val().length === 0) {
      $("#error-container").slideDown()
      $("#error-container").children().text("Your tweet is empty! add some characters and try again!")
      return
    }
    //if tweet exceeds 140 chars.
    if ($("#tweet-text").val().length > 140) {
      $("#error-container").slideDown()
      $("#error-container").children().text("Your tweet is looking a little chonky, 140 chars max!")
      return
    }
    //other non valid data entered (null, undefined())
    if (!$("#tweet-text").val()) {
      $("#error-container").slideDown()
      $("#error-container").children().text("Something went wrong, please re-enter your tweet, and try again!")
      return
    }

    const data = $form.serialize();
    //make a post request with info
    $.post("/tweets", data, function(response) {
      $("#tweet-text").val("");
      $(".counter").text(140);
      $("#error-container").slideUp()
        loadTweets();
      })
      
  })
  //recieves array of tweets
  const loadTweets = function() {
    $.get("/tweets", function(response) {
      renderTweets(response);
    })
  }
  
  loadTweets()

})
//this is the end of the ready  

//escape function for converting content to basic text
const toSafeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};