# imagecropper


## Server-side

```js
var Clipper = require('image-clipper');

Clipper('/path/to/image.jpg', function() {
    this.crop(20, 20, 100, 100)
    .resize(50, 50)
    .quality(80)
    .toFile('/path/to/result.jpg', function() {
       console.log('saved!');
   });
});
```

## Client-side (browser)


```html
<img id="preview" alt="image-clipper preview">
<script src="./imagecropper.js"></script>
<script src="./parameters.js"></script>
```

```js
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    downloadLink.download = "cropped.jpg";
    var preview = document.getElementById('preview');
    imageClipper(imgSrc, function() {
        this.crop(x, y, cropWidth, cropHeight)  
        .toDataURL(function(dataUrl) {
            preview.src = dataUrl;
            downloadLink.href = dataUrl;
        });
    downloadLink.click();
```
