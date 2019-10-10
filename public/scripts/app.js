$("#tweet-submit").submit(function( event ) {
  event.preventDefault();
  let data = $('#tweetTextArea').val();
  if (data.length === 0 || data === null) {
    $("#too-many").slideUp("medium")
    $("#not-enough").slideDown("medium")
  } else if (data.length > 140) {
    $("#not-enough").slideUp("medium")
    $("#too-many").slideDown("medium")
  } else {
    $("#too-many").slideUp("medium")
    $("#not-enough").slideUp("medium")
    $.ajax({ method: 'POST', url: '/tweets', data: $( this ).serialize()})
    .then(function (data) {
      loadTweets(data)
      $("#tweetTextArea").val('')
    });
  }
});

$("#header-arrow").on("click", function (event) {
  event.preventDefault();
  $(".new-tweet").slideToggle("medium")
  $("#tweetTextArea").focus()
})

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
    $('#tweets-container').prepend(newTweet);
  }
};

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObject) {
  let $tweet = $('<article>').addClass('tweet');
  $tweet.append(
    `<article class="composed-tweet">
      <header id="tweet-header">
        <span id="user-image"><img src="https://i.imgur.com/nlhLi3I.png"> ${escape(tweetObject.user.name)}</span>
        <span id="user-id">${escape(tweetObject.user.handle)}</span>
      </header>
      <span id="tweet-text">${escape(tweetObject.content.text)}</span>
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
};

const scrollButtonAppear = $(window).scroll(function () {
  if (($(window).scrollTop()) >= 250) {
    $("#scroll-button").removeClass("before-scroll")
    $("#scroll-button").addClass("after-scroll")
  }
  else {
    $("#scroll-button").addClass("before-scroll")
    $("#scroll-button").removeClass("after-scroll")
  }
})

const scrollButtonClick = $("#scroll-button").on("click", function (event) {
  event.preventDefault();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})