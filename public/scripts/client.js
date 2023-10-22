/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //FUNCTION TO CREATE TWEET ELEMENT STRUCTURE

  const createTweetElement = function (tweet) {
    //creating html structure and wrapping it in a jquery object
    const markup = $(`<article>
  <header>
    <ul>
      <div>
        <li>
          <img src="${tweet.user.avatars}" alt="user-picture" />
        </li>
        <li>${tweet.user.name}</li>
      </div>
      <li>${tweet.user.handle}</li>
    </ul>
  </header>
  <textarea name="text">${tweet.content.text}</textarea>
  <footer>
    <ul>
      <li>${tweet.created_at}</li>
      <div>
        <li><i class="fa-solid fa-flag"></i></li>
        <li><i class="fa-solid fa-retweet"></i></li>
        <li><i class="fa-sharp fa-solid fa-heart"></i></li>
      </div>
    </ul>
  </footer>
  </article>`);

    //adding classes to jquery objects

    //no need to find 'article' because markup object itself represents 'article'
    markup.addClass("tweet");
    markup.find("header > ul > div").addClass("user-info");
    markup.find("header > ul > div > li:nth-child(1)").addClass("user-picture");
    markup.find("header > ul > div > li:nth-child(2)").addClass("user-name");
    markup.find("header > ul > li").addClass("tweeter-handle");
    markup.find("footer > ul > div").addClass("icons");

    const $tweet = markup;
    return $tweet;
  };

  //FUNCTION TO RENDER TWEETS

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".tweet-container").prepend($tweet);
    }
  };

  //FUNCTION TO LOAD TWEETS

  const loadTweets = function () {
    const url = "/tweets";

    $.get(url, function (data) {
      console.log("Response received: ", data);
    }).done(function (data) {
      console.log("Request Successful");
      renderTweets(data);
    });
  };

  loadTweets();

  //EVENT HANDLER: WHEN USER SUBMITS A TWEET

  $("form").on("submit", function (event) {
    event.preventDefault();

    const url = "/tweets/";
    const postData = $(this).serialize();

    $.post(url, postData)
      .done(function () {
        // Handle a successful response
        console.log("Request successful");
      })
      .fail(function () {
        // Handle any errors that occurred during the request
        console.error("Error");
      })
      .always(function () {
        // This block will be executed whether the request succeeds or fails
        console.log("Request completed.");
      });
  });
});
