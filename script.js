var CANVAS_SIZE = 800;
$(document).ready(function() {
    var downloadLink = document.createElement('a');
    downloadLink.href = "#";
    document.getElementsByTagName('body')[0].appendChild(downloadLink);
    $("a").on("click", function() {
        this.href = canvas.toDataURL('image/png')
          .replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
    });

    var canvas = document.createElement('canvas');
    canvas.width  = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    downloadLink.appendChild(canvas);
    var context = canvas.getContext('2d');

    drawRandomPhotos().then(function() {
        $.ajax({
          url: "https://quotes.rest/qod",
          Accept: "application/json",
          success: function(data) {
            console.log("SUCCESS!");

            context.font = "40px Georgia bold";
            context.textAlign = "center";
            canvas.shadowColor = "rgba(1, 1, 1, 1)";
            var lines = getLines(
              data.contents.quotes[0].quote
              //"Требуется генерировать коллажи изображений с цитатами с помощью элемента canvas с возможностью сохранения контента на чистом javascript (без html и css)"
            );
            var start_line = (CANVAS_SIZE / 2) - (lines.length * 40);
            for(var k = 0; k < lines.length; k++) {
              context.fillText(
                lines[k],
                CANVAS_SIZE / 2,
                start_line + 80 * k
              );
            }
          },
          error: function(data) {
            console.log("ERROR!");
            console.log(data.statusText);
          }
        });
    });

  function getLines(text) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = context.measureText(currentLine + " " + word).width;
        if (width < CANVAS_SIZE * 0.9) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
  }

  function drawRandomPhotos() {
    return new Promise(function(resolveMain) {
      var promises = [];
      $.ajax({
        url: "https://api.unsplash.com/photos/random?client_id=" + my_access_key + "&count=4&query='white background'",
        success: function(data) {
          var counter = 0;
          var positions = [];
          for (i = 0; i < 4; i ++) {
            positions[i] = {
              x : (CANVAS_SIZE / 2) * (i % 2),
              y : (CANVAS_SIZE / 2) * (i > 1)
            };
            promises.push(
              new Promise(function(resolve, reject) {
                var image = new Image();
                var localCounter = counter++;
                image.src = data[localCounter].urls.full;
                image.crossOrigin = '';
                image.onload = function() {
                  context.drawImage(
                      image,
                      0, 0, image.width, image.height,
                      positions[localCounter].x,
                      positions[localCounter].y,
                      CANVAS_SIZE / 2,
                      CANVAS_SIZE / 2
                  );
                  resolve();
                }
                image.onerror = function(error) {
                  console.error(error);
                  reject();
                }
              })
            );
          }
          Promise.all(promises).then(resolveMain);
        },
        error: function(data) {
          console.log("ERROR!");
          console.log(data.statusText);
        }
      });
    });
  }

});
var my_access_key = "d9f243a0c0dbad39e3311e3e68c98f283132bbd4f915a9a8430723c1b9312592";
