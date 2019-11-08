// Set a maximum tweet length
const maxTweetLength = 140

// Wait until the document is ready to run scripts
$(document).ready(() => {

  $(".new-tweet form textarea").on('keyup', function () {

    // Get the text in the tweet area && the current tweet length
    const newTweetLength = $(this).val().length;



    // Get the current counter
    $(this).siblings('.counter').text(maxTweetLength - newTweetLength);
    const counterValue = $(this).siblings('.counter').text();

    // Cleary any Current Errors
    $(this).siblings(".invalid-post").slideUp()
    $(this).siblings(".invalid-post").text("")

    // Set the color of the text to be red when over the limit;
    $(this).siblings('.counter').toggleClass('characterLimit', counterValue < 0);

    // Performance hit if it's global, shorter tree traversals with "this"
    // Isolates to local pieces of the tree
    // Web Components - Implemented in the browser - Super encapsulated

  });

});