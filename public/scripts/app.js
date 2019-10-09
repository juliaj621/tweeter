// Test / driver code (temporary). Eventually will get this from the server.
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
    for (let x = 0; x < tweets.length; x++) {
    let newTweet = createTweetElement(tweets[x])
    $('#tweets-container').append(newTweet);
  }
};

const createTweetElement = function(tweetObject) {
  let $tweet = $('<article>').addClass('tweet');
  $tweet.append(
    `<article class="composed-tweet">
      <header id="tweet-header">
        <span id="user-image"><img src="https://i.imgur.com/nlhLi3I.png"> ${tweetObject.user.name}</span>
        <span id="user-id">${tweetObject.user.handle}</span>
      </header>
      <span id="tweet-text">${tweetObject.content.text}</span>
      <footer class="composed-tweet">
        <span id="date">${new Date(tweetObject.created_at)} days ago</span>
        <div id="icons">
          <button class="icon-button"><i class="fa fa-flag" aria-hidden="true"></i></button>
          <button class="icon-button"><i class="fa fa-retweet" aria-hidden="true"></i></button>
          <button class="icon-button"><i class="fa fa-heart" aria-hidden="true"></i></button>
        </div>
      </footer>
    </article>`)
  return $tweet;
}

renderTweets(data)