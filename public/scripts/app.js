$("#tweet-submit").submit(function( event ) {
  event.preventDefault();
  console.log($( this ).serialize());
  $.ajax({ method: 'POST', url: '/tweets', data: $( this ).serialize()})
  .then(function (data) {
    console.log('Success: ', data);
    loadTweets(data)
  });
});

const loadTweets = function () {
  $.ajax({method: 'GET', url: '/tweets', dataType: 'JSON'})
  .then(res => {
    console.log('Success: ', renderTweets(res))
  });
};

loadTweets()

const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (let i = 0; i < tweets.length; i++) {
    let newTweet = createTweetElement(tweets[i])
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