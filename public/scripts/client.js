/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const renderTweets = function (tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('.tweets-container').append(createTweetElement(tweet));
  }
}

const createTweetElement = function (tweet) {
  let $tweet = `
    <article class="tweet">
      <header>
        <img class="avatar" src=${tweet.user.avatars}>
        <span class="username">${tweet.user.name}</span>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <div class="tweet-body">
        ${tweet.content.text}
      </div>
      <footer>
        <span>${tweet.created_at}</span>
        <a>#</a>
        <a>%</a>
        <a>&</a>
      </footer>
    </article>
  `;
  return $tweet;
}

$(document).ready(() => {

  const loadTweets = function () {
    $.ajax('/tweets', {
      method: 'GET'
    }).then(function (tweetData) {
      renderTweets(tweetData);
    });
  }
  loadTweets();

  $(".post-tweet").on("submit", function (event) {
    event.preventDefault();
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    });
  });

});