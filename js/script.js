function cropper() {
    const image = document.getElementById('image');
    const cropper = new Cropper(image, {
    crop(event) {
        console.clear();
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
    },
    });
}