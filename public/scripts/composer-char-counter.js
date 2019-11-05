// Wait until the document is ready to run scripts
$(document).ready(() => {
  
  $(".new-tweet").on('click', function() {
    const $textArea = $('textarea');
    const tweetLength = $textArea.val().length;
    console.log(tweetLength);
  });

});