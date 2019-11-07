/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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

  renderTweets(data);

  $(".post-tweet").on("submit", function (event) {
    event.preventDefault();
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
  });

});