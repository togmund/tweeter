/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const renderTweets = function (tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('.tweets-container').prepend(createTweetElement(tweet));
  }
};

const createTweetElement = function (tweet) {
  let $tweet = `
    <article class="tweet">
      <header>
        <img class="avatar" src=${escape(tweet.user.avatars)}>
        <span class="username">${escape(tweet.user.name)}</span>
        <span class="handle">${escape(tweet.user.handle)}</span>
      </header>
      <div class="tweet-body">
        ${escape(tweet.content.text)}
      </div>
      <footer>
        <span>${escape(tweet.created_at)}</span>
        <a>#</a>
        <a>%</a>
        <a>&</a>
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
  loadTweets();

  $(".post-tweet").on("submit", function (event) {
    event.preventDefault();

    if ($(this).children(".counter").text() == 140) {
      alert("C'mon, type something!");
    }
    if ($(this).children(".counter").text() < 0) {
      alert("Make that little red number in the bottom right not red.");
    } else {
      $.ajax('/tweets', {
        method: 'POST',
        data: $(this).serialize()
      }).then(function () {
        $(this).parents('.tweets-container').empty();
        loadTweets();
      }
      );
      $(this).children('textarea').val("");
      $(this).children('.counter').text(140);

    }
  });
});