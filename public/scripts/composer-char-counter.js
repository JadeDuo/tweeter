$(document).ready(function() {
const tweet = $("#tweet-text");
  tweet.on("input", function() {
    const text = $(this).val();
    const counter = $(this).siblings(".lower-tweet").children(".counter")
    counter.html(140 - text.length)
    if (140 - text.length < 0) {
      counter.css("color", "red")
    } else {
      counter.css("color", "black")
    }

  })




});




