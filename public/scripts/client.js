/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = function(data) {
    const $tweet = $(`
    <article class="tweet">
      <header>
        <div>
          <img src=${data.user.avatars}>
          <span>${data.user.name}</span>
        </div>  
        <span>${data.user.handle}</span>
      </header>
      <p>${data.content.text}</p>
      <footer class="tweet-footer">
        <span>${data.created_at}</span>
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
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet)
      $('.display-tweet').append($tweet);
    }


  }
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


renderTweets(data)

})
  
  
  