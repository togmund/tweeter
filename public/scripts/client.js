/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const renderTweets = function (tweets) {
  // loops through tweets
  $('.tweets-container').empty()
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('.tweets-container').prepend(createTweetElement(tweet));
  }
};

const createTweetElement = function (tweet) {
  const userAvatar = escape(tweet.user.avatars)
  const userName = escape(tweet.user.name)
  const userHandle = escape(tweet.user.handle)
  const tweetText = escape(tweet.content.text)
  const tweetPostTime = new Date(0);
  tweetPostTime.setSeconds(escape(tweet.created_at));

  let $tweet = `
    <article class="tweet">
      <header>
        <img class="avatar" src=${userAvatar}>
        <span class="username">${userName}</span>
        <span class="handle">${userHandle}</span>
      </header>
      <div class="tweet-body">
        ${tweetText}
      </div>
      <footer>
        <span>${tweetPostTime.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})}</span>
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


$(document).ready(() => {

  const loadTweets = function () {
    $.ajax('/tweets', {
      method: 'GET'
    }).then(function (tweetData) {
      renderTweets(tweetData);
    });
  };

  $(".new-tweet").hide()
  loadTweets();

  $(".post-tweet").on("submit", function (event) {
    event.preventDefault();
    if ($(this).children(".counter").text() == 140) {
      $(this).children(".invalid-post").text("Too Short").slideDown();
    }
    if ($(this).children(".counter").text() < 0) {
      $(this).children(".invalid-post").text("Too Long").slideDown();
    } else {
      $.ajax('/tweets', {
        method: 'POST',
        data: $(this).serialize()
      }).then(function () {
        loadTweets();
      }
      );
      $(this).children('textarea').val("");
      $(this).children('.counter').text(140);
    }
  });

  $(".form-toggle").on("click", function (event) {
    if ($(".new-tweet").is(":visible")) {
      $(".new-tweet").slideUp();
    }
    else {
      $(".new-tweet").slideDown();
      $(".new-tweet").children().children("textarea").focus();
    }
  })
});