// Wait until the document is ready to run scripts
$(document).ready(() => {
  
  $(".new-tweet").on('change', function() {

    // Get the text in the tweet area && the current tweet length
    const $tweetArea = $('textarea');
    const tweetLength = $tweetArea.val().length;

    // Get the current counter
    const $counter = $('.counter');
    const counterValue = $counter.text();

    console.log(`tweet length = ${tweetLength}`);
    console.log(`counter value = ${counterValue}`);
  });

});