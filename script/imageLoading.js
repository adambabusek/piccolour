/*
    Function is called on "change" event of fileInput
*/
function onFileSelected() {
    // reset all
    reset();

    // choose first file if multiple selection is enabled
    var file = this.files[0];
    var imageType = /image.*/;
    // if chosen file doesn't match imageType then show alert
    if (!file.type.match(imageType)) {
        this.value = null;
        alert("Not an image!");
        return;
    }

    var reader = new FileReader();
    reader.onload = onFileLoad;
    reader.readAsDataURL(file); // read selected file
}

/*
    Function is called on "load" event of FileReader.
    Onload event of FileReader is triggered when reading of file is successfully completed.
*/
function onFileLoad() {
    var img = new Image();
    img.src = this.result;
    buildImageInfo(img);
    img.onload = function() {
        $("#image-container").append(createCanvas(img));
    };
}

/*
    Resets all settings and elements created/set by previous file loading
*/
function reset() {
    var $canvas = $("#canvas").remove();
}
