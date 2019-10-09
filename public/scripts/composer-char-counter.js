$(document).ready(function() {
  $('#tweetTextArea').keyup(function() {
    const text = $(this).val();
    const buttonValue = 140;
    $(this).siblings(".form-button").children(".counter").text(buttonValue - text.length);
    if (text.length > 140) {
      $(this).siblings(".form-button").children(".counter").css("color", "red");
    } else {
      $(this).siblings(".form-button").children(".counter").css("color", "#545149");
    }
  });
});