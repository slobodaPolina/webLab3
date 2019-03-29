$(document).ready(function() {
    $("body").add("canvas");
    var urls = [];
    /*for(var j = 0; j < 4; j++) {
      $.ajax({
        url: "https://api.unsplash.com/photos/random?client_id=" + my_access_key,
        success: function(data) {
          console.log("SUCCESS!");
          urls.push(data.urls.full);
        },
        error: function(data) {
          console.log("ERROR!");
          console.log(data.statusText);
        }
      });
    }*/

    var context = $("canvas")[0].getContext('2d');
    var base_image = new Image();
    base_image.src = 'https://unsplash.com/photos/6LZuSzSwso0';
    base_image.onload = function() {
      context.drawImage(base_image, 0, 0);
    }

});
var my_access_key = "d9f243a0c0dbad39e3311e3e68c98f283132bbd4f915a9a8430723c1b9312592";
