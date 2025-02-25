/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//for escaping XSS
const escapeHtml = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
  const maxTweetLength = 140;
  //FUNCTION TO CREATE TWEET ELEMENT STRUCTURE

  const createTweetElement = function (tweet) {
    //creating html structure and wrapping it in a jquery object
    const tweetContent = $(
      `<textarea name="text" readonly>${tweet.content.text}</textarea>`
    );
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
  <textarea name="text" readonly>${escapeHtml(tweet.content.text)}</textarea>
  <footer>
    <ul>
      <li>${timeago.format(tweet.created_at)}</li>
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

  //EVENT HANDLER: TO HIDE ERROR MESSAGE IF FOCUS IS ON INPUT FIELD AND LENGTH OF CHARACTERS IS LESS THAN MAX TWEET LENGTH

  $("#tweet-text").on("focus", function (event) {
    //fetching user input's value and length
    const textValue = $(this).val();
    const textLength = textValue.length;
    const errorMessageDisplayValue = $(".error-message").css("display");

    if (textLength < maxTweetLength && errorMessageDisplayValue !== "none") {
      $(".error-message").slideUp("slow");
      return;
    }
  });

  //EVENT HANDLER: WHEN USER SUBMITS A TWEET

  $("form").on("submit", function (event) {
    event.preventDefault();

    const url = "/tweets/";
    const postData = $(this).serialize();

    //fetching user input's value and length
    const textValue = $(this).find("#tweet-text").val();
    const textLength = textValue.length;

    //making sure error validation is hidden at first
    $errorMessage = $(".error-message").css("display", "none");

    if (!textLength) {
      $errorMessage.text(
        "You are trying to post an empty tweet. Please enter some content first."
      );
      $(".new-tweet").prepend($errorMessage);
      $errorMessage.slideDown("slow");
      return;
    }

    if (textLength > maxTweetLength) {
      $errorMessage.text(
        `The maximum length of tweet is ${maxTweetLength} characters.`
      );
      $(".new-tweet").prepend($errorMessage);
      $errorMessage.slideDown("slow");
      return;
    }

    $.post(url, postData)
      .done(function () {
        // Handle a successful response
        console.log("Request successful");
        //fetching latest tweets
        loadTweets();
        //Clearing the text from textarea and updating the counter
        $("form").find("#tweet-text").val("");
        $(".counter").val(maxTweetLength);
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
