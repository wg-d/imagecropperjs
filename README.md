# imagecropper

## About this library

This library is utilizing `image-clipper` module and made for simple image cropping with `5 parameters` - `base64 string`, `starting point X`, `starting point Y`, `cropping width` and `cropping height`.

I always welcome to comments and feedback on this library. 
Feel free to ping me at `dmitriykokolo@gmail.com` or skype me at `live:.cid.1c3770f2a3c6fb02` for any development or usage issue with the library.
For more infomation about my expertise, visit my portfolio website https://dmitriy-kokolo.web.app and github https://github.com/wg-d.
If you want to support me for my open source work, consider sending crypto to `0x40F06E0429F3aE260F94d93a700c8bC3502d9B54` (BSC, Ethereum) or star my repos on github.com at least. 

Thank you very much!

## Server-side
Run:
`cd server-side && npm install && node index.js`
And set `parameters` in `#Parameters` section in `index.js`

```js
var Clipper = require('image-clipper');

Clipper('/path/to/image.jpg', function() {
    this.crop(20, 20, 100, 100)
    .resize(50, 50)
    .quality(92)
    .toFile('/path/to/result.jpg', function() {
       console.log('saved!');
   });
});
```

## Client-side (browser)
Open `index.html` and set `parameters` in `parameters.js`

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
