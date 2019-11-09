/**
 * Represents The maxiumum tweet length
 * @constant
 */
const maxTweetLength = 140;

/**
 * Wait for full document to load before running scripts
 * @event
 */
$(document).ready(() => {

  /**
   * Handles all actions triggered when keystrokes fire in the textarea of the tweet composition form
   * @event
   */
  $(".new-tweet form textarea").on('keyup', function() {

    const newTweetLength = $(this).val().length; // Current characters used in text box
    $(this).siblings('.counter').text(maxTweetLength - newTweetLength); // Updates the user-facing counter on each keystroke

    const counterValue = $(this).siblings('.counter').text(); // retrieves the live value of the counter
    $(this).siblings(".invalid-post").slideUp("fast"); // dismisses the invalid submission prompt on each new keystroke
    $(this).siblings('.counter').toggleClass('characterLimit', counterValue < 0); // set the color of the counter to red when past the tweet limit
  });

});