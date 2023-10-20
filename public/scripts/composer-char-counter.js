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

    // if (charCount > charsLimit) {
    //   $(this)
    //     .siblings("#tweet-section")
    //     .children(".counter")
    //     .text(charsLeft)
    //     .css("color", "red");
    // } else {
    //   $(this)
    //     .siblings("#tweet-section")
    //     .children(".counter")
    //     .text(charsLeft)
    //     .css("color", "#545149");
    // }
  });
});


// document .ready () => {
//   tweetText.on(input, function() {
//     maxTweet= 140
//     tweetLength = $this.val().length
    
    
//     $sublin.children.text(maxLength -tweetLenght)
  
//     if(tweetLength > maxLength) {
//       counter.addClass('colorCounter')
      
//     } else {
//       counter.removeClass('coolorCounter')
//     }
    
    
//   })
  
  
// }