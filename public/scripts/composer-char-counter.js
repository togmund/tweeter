// Set a maximum tweet length
const maxTweetLength = 140

// Wait until the document is ready to run scripts
$(document).ready(() => {
  
  $(".new-tweet").on('keyup', function() {

    // Get the text in the tweet area && the current tweet length
    const $tweetArea = $('textarea');
    const newTweetLength = $tweetArea.val().length;

    // Get the current counter
    const $counter = $('.counter');
    $counter.text(maxTweetLength - newTweetLength);
    const counterValue = $counter.text();

  });

});