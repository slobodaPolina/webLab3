var CANVAS_SIZE = 800;
$(document).ready(function() {
    var canvas = document.createElement('canvas');
    canvas.width  = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    document.getElementsByTagName('body')[0].appendChild(canvas);
    var context = canvas.getContext('2d');

    var promises = [];
    for(var i = 0; i < 2; i++) {
      for(var j = 0; j < 2; j++) {
        promises.push(
          drawImage('test.jpg', CANVAS_SIZE * i / 2, CANVAS_SIZE * j / 2)
        );
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
    Promise.all(promises).then(function() {
        $.ajax({
          url: "https://quotes.rest/qod",
          Accept: "application/json",
          success: function(data) {
            console.log("SUCCESS!");
            console.log(data.contents.quotes[0].quote);

            context.font = "40px Georgia";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(
              data.contents.quotes[0].quote,
              CANVAS_SIZE / 2,
              CANVAS_SIZE / 2
            );
          },
          error: function(data) {
            console.log("ERROR!");
            console.log(data.statusText);
          }
        });
    });

    //src of image, x and y position in the canvas
    function drawImage(src, x, y) {
      return new Promise(function (resolve) {
        var image = new Image();
        image.src = src;
        image.onload = function() {
          context.drawImage(
            image,
            0, 0, image.width, image.height,
            x, y, 400, 400
          );
          resolve();
        }
        image.onerror = function(error) {
          console.error(error);
        }
      });
  }

});
var my_access_key = "d9f243a0c0dbad39e3311e3e68c98f283132bbd4f915a9a8430723c1b9312592";
