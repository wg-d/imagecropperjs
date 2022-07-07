
## For frontend:

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Image Cropper</title>
</head>
<body>
  <!-- <a href="" download></a> -->
  <img id="preview" alt="image-clipper preview">
  <script src="./image-clipper.js"></script>
  <script src="./parameters.js"></script>
  <script>
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    downloadLink.download = "./cropped.jpg";
    var preview = document.getElementById('preview');
    imageClipper(imgSrc, function() {
        this.crop(x, y, cropWidth, cropHeight)  
        .toDataURL(function(dataUrl) {
            preview.src = dataUrl;
            downloadLink.href = dataUrl;
        });
    downloadLink.click();
});
  </script>
</body>
</html>



## For backend: 
<script>

var Clipper = require('image-clipper');

Clipper('/path/to/image.jpg', function() {
    this.crop(20, 20, 100, 100)
    .resize(50, 50)
    .quality(80)
    .toFile('/path/to/result.jpg', function() {
   });
   
});

</script>
