$(document).ready(function () {
  const tweetText = $("#tweet-text");
  let maxTweetLength = 140;
  tweetText.on("input", function () {
    let tweetLength = $(this).val().length;
    let charsLeft = maxTweetLength - tweetLength;

    $(this).siblings("#tweet-section").children(".counter").text(charsLeft);

    if (tweetLength > maxTweetLength) {
      $(this)
        .siblings("#tweet-section")
        .children(".counter")
        .addClass("color-counter");
    } else {
      $(this)
        .siblings("#tweet-section")
        .children(".counter")
        .removeClass("color-counter");
    }
  });
});
