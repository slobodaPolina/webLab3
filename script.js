var CANVAS_SIZE = 800;
$(document).ready(function() {
    var canvas = document.createElement('canvas');
    canvas.width  = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    document.getElementsByTagName('body')[0].appendChild(canvas);
    var context = canvas.getContext('2d');

    for(var i = 0; i < 2; i++) {
      for(var j = 0; j < 2; j++) {
        drawImage('test.jpg', CANVAS_SIZE * i / 2, CANVAS_SIZE * j / 2);
        /*
        $.ajax({
          url: "https://api.unsplash.com/photos/random?client_id=" + my_access_key,
          success: function(data) {
            console.log("SUCCESS!");
            drawImage(data.urls.full, CANVAS_SIZE * i / 2, CANVAS_SIZE * j / 2);
          },
          error: function(data) {
            console.log("ERROR!");
            console.log(data.statusText);
          }
        });
        */
      }
    }

    //src of image, x and y position in the canvas
    function drawImage(src, x, y) {
      var image = new Image();
      image.src = src;
      image.onload = function() {
        context.drawImage(
          image,
          0, 0, image.width, image.height,
          x, y, 400, 400
        );
      }
      image.onerror = function(error) {
        console.error(error);
      }
  }

});
var my_access_key = "d9f243a0c0dbad39e3311e3e68c98f283132bbd4f915a9a8430723c1b9312592";
