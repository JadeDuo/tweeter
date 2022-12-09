$(document).ready(function() {
  $(".new-tweet").hide()

  //sets the right nav to listen for click event which will unhide the new tweet element and focus it for input.
  $(".right-nav").on("click", function(){
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus()
  })

  

})
