//displays a random string when you click a button. This string should
//show in a DOM element - e.g. in the page itself - instead of
//in an alert or on the console. You'll be using the function
//you just wrote above to generate that random string. Use jQuery to do this.
function randString(desiredLength) {
  var randomString = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < desiredLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length); //generate a random number from 0-61
      randomString += chars.substring(randomNumber, randomNumber + 1); //add a random char onto the string
    }
    return randomString;
}


$(function() {
  $('.myButton').on('click', function() {
    $('#newString').empty();
    $('#newString').append(randString(7));
  });
});
