/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

$(document).ready(function () {
  const createTweetElement = function (tweet) {
    const markup = $(`<article class="tweet">
  <header>
    <ul>
      <div class="user-info">
        <li class="user-picture">
          <img src="${tweet.user.avatars}" alt="user-picture" />
        </li>
        <li class="user-name">${tweet.user.name}</li>
      </div>
      <li class="tweeter-handle">${tweet.user.handle}</li>
    </ul>
  </header>
  <textarea name="text">${tweet.content.text}</textarea>
  <footer>
    <ul>
      <li>${tweet.created_at}</li>
      <div class="icons">
        <li><i class="fa-solid fa-flag"></i></li>
        <li><i class="fa-solid fa-retweet"></i></li>
        <li><i class="fa-sharp fa-solid fa-heart"></i></li>
      </div>
    </ul>
  </footer>
  </article>`);

    // markup.addClass('tweet');
    // markup.find('header > ul > div').addClass('user-info');
    // markup.find("header > ul > div > li:nth-child(1)").addClass("user-picture");
    // markup.find("header > ul > div > li:nth-child(2)").addClass("user-name");
    // markup
    //   .find("header > ul > li")
    //   .addClass("tweeter-handle");
    // markup.find("footer > ul > div").addClass("icons");

    const $tweet = markup;
    return $tweet;
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $(".tweet-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
