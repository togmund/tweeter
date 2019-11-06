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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  // loops through tweets
  for (let tweet in tweets) {
  // calls createTweetElement for each tweet
    createTweetElement(tweet);
  }
  // takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  return $tweet;
}

renderTweets(data);

console.log(renderTweets(data));
// $('#tweets-container').append($tweet);