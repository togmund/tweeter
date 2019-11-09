/*
 * Client-side JS logic goes here
 */

/**
 * Represents human-readable interval since a tweet was written
 * @function
 * @param {Number} time - number of miliseconds since a tweet was written
 */
const timeSince = (time) => {
  if (Math.floor((time / 1000)) < 5) {
    return `now`;
  }
  if (Math.floor((time / 1000)) < 60) {
    return `${Math.floor((time / 1000))} seconds ago`;
  }
  if (Math.floor((time / 1000) / 60) < 60) {
    return `${Math.floor((time / 1000) / 60)} minutes ago`;
  }
  if (Math.floor((time / 1000) / 60) / 60 < 24) {
    return `${Math.floor((time / 1000) / 60) / 60} hours ago`;
  }
  if (Math.floor(((time / 1000) / 60) / 60) / 24 < 30) {
    return `${Math.floor(((time / 1000) / 60) / 60) / 24} days ago`;
  }
  if (Math.floor((((time / 1000) / 60) / 60) / 24) / 30 < 12) {
    return `${Math.floor((((time / 1000) / 60) / 60) / 24) / 30} months ago`;
  }
  return `${Math.floor((((((time / 1000) / 60) / 60) / 24) / 30) / 12)} years ago`;
};

/**
 * Represents safely-escaped raw user inputs for presentation
 * @function
 * @param {String} str - the raw input from the user in the tweet form
 */
const escape =  (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/**
 * Represents loading each prepared tweet into the the tweets container, newest on top.
 * @function
 * @param {Array} tweets - an array of all tweets to be rendered on the page
 */
const renderTweets =  (tweets) => {
  $('.tweets-container').empty();
  for (const tweet of tweets) {
    $('.tweets-container').prepend(createTweetElement(tweet));
  }
};

/**
 * Represents consuming raw tweet data, escaping dangerous characters and preparing classed html for presentation.
 * @function
 * @param {Object} tweet - a tweet object with all the details to be organized
 */
const createTweetElement = function(tweet) {
  const userAvatar = escape(tweet.user.avatars);
  const userName = escape(tweet.user.name);
  const userHandle = escape(tweet.user.handle);
  const tweetText = escape(tweet.content.text);
  const tweetPostTime = (Date.now() - escape(tweet.created_at) - 744000);
  let $tweet = `
    <article class="tweet">
      <header>
        <div>
          <img class="avatar" src=${userAvatar}>
          <span class="username">${userName}</span>
        </div>
          <span class="handle">${userHandle}</span>
      </header>
      <div class="tweet-body">
        ${tweetText}
      </div>
      <footer>
        <span>${timeSince(tweetPostTime)}</span>
        <div class="tweet-actions">
          <span class="iconify" data-icon="ant-design:flag-fill" data-inline="false"></span>
          <span class="iconify" data-icon="emojione-monotone:clockwise-vertical-arrows" data-inline="false"></span>
          <span class="iconify" data-icon="ant-design:heart-fill" data-inline="false"></span>
        </div>
        </footer>
    </article>
  `;
  return $tweet;
};

/**
 * Wait for full document to load before running scripts
 * @event
 */
$(document).ready(() => {

  /**
   * Prepares a function that will, on demand, fetch all tweets in the 'database'
   * and render them on the page for the user
   * @function
   */
  const loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET'
    }).then(function(tweetData) {
      renderTweets(tweetData);
    });
  };

  /**
   * Hides the new tweet when the page is first loaded or refreshed
   * @event
   */
  $(".new-tweet").hide();

  /**
   * Loads all current tweets when the page is first loaded or refreshed
   * @event
   */
  loadTweets();

  /**
   * Handles all behaviour related to the tweet submit button being pressed
   * @event
   */
  $(".post-tweet").on("submit", function(event) {

    event.preventDefault();

    if ($(this).children(".counter").text() == 140) { // Rejects tweets with no characters
      $(this).children(".invalid-post").text("Too Short").slideDown();
    }
    
    if ($(this).children(".counter").text() < 0) { // Rejects tweets with too many characters
      $(this).children(".invalid-post").text("Too Long").slideDown();
    } else {
      $.ajax('/tweets', { // Posts tweets that pass validation
        method: 'POST',
        data: $(this).serialize()
      }).then(function() {
        loadTweets(); // Renders new tweets, including the newly posted tweet
      }
      );
      $(this).children('textarea').val(""); // resets the text area to empty
      $(this).children('.counter').text(140); // resets the counter to the tweet limit
    }
  });

  /**
   * Toggles the new tweet area
   * @event
   */
  $(".form-toggle").on("click", function(event) {
    if ($(".new-tweet").is(":visible")) {
      $(".new-tweet").slideUp(); // Hides a visible tweet composer on click
    } else {
      $(".new-tweet").slideDown(); // reveals a hidden tweet composer on click
      $(".new-tweet").children().children("textarea").focus(); // focuses text entry on newly revealed tweet composer
    }
  });
});