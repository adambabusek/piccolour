/*
	Retrieve and calculate all necessary information for image processing, canvas creation, etc.
	Image info is stored in global variables "imageInfo" and "conf" depending on type of information.
*/
function buildImageInfo(image) {
	// save dimensons and proportion of loaded image
	imageInfo.width = image.width;
	imageInfo.height = image.height;
	imageInfo.proportion = image.width / image.height;

	// calculate maximum display dimensions and calculate correct display dimensions
	var displayDimensions = calcImageDisplayDimensions();
}

/*
	Returns new canvas element filled with loaded image.
*/
function createCanvas(image) {
	var canv = document.createElement("canvas");
    canv.id="canvas";
	canv.width = displayInfo.width;
	canv.height = displayInfo.height;
	var ctx = canv.getContext("2d");

	ctx.drawImage(image, 0, 0, displayInfo.width, displayInfo.height);
	return canv;
}

/*
	Calculates maximum dimensons of canvas. Dimensions depends on screen resolution.
	Returns object with properties "width" and "height".
*/
function calcImageMaxDimensions() {
	// select elements and calculate padding of image-container
	var $window = $(window);
	var $panelContainer = $("#panel-container");
	var imageTotalPadding = 2 * Number($("#image-container").css("padding").replace("px", ""));

	// maximum width of image is innerWidth of window minus right-sided panel minus padding
	var windowWidth = $window.innerWidth();
	var panelWidth = $panelContainer.innerWidth();
	var maxWidth = windowWidth - panelWidth - imageTotalPadding;

	// maximum height of image is innerHeight of window minus padding
	var windowHeight = $window.innerHeight();
	var maxHeight = windowHeight - imageTotalPadding;

	return {width: maxWidth, height: maxHeight};
}

/*
	Calculates display dimensions of image if original dimensions
	are greater than calculated maximum dimensions.
*/
function calcImageDisplayDimensions() {
	// calculate maximum possible dimensions for displaying image
	var maxDimensions = calcImageMaxDimensions();

	// if image is horizontally oriented and if original width is greater than maximum possible width
	if (imageInfo.proportion >= 1 && imageInfo.width > maxDimensions.width) {
		// set resizing proportion and use it for calculating height
		if (maxDimensions.width / imageInfo.proportion < maxDimensions.height) {
			displayInfo.resizeValue = maxDimensions.width / imageInfo.width;
			displayInfo.width = maxDimensions.width;
			displayInfo.height = imageInfo.height * displayInfo.resizeValue;
		} else {
			displayInfo.resizeValue = maxDimensions.height / imageInfo.height;
			displayInfo.height = maxDimensions.height;
			displayInfo.width = imageInfo.width * displayInfo.resizeValue;
		}
	} else if (imageInfo.proportion < 1 && imageInfo.height > maxDimensions.height) { // image is vertically oriented
		if (maxDimensions.height / imageInfo.proportion < maxDimensions.width) {
			displayInfo.resizeValue = maxDimensions.height / imageInfo.height;
			displayInfo.height = maxDimensions.height;
			displayInfo.width = imageInfo.width * displayInfo.resizeValue;
		} else {
			displayInfo.resizeValue = maxDimensions.height / imageInfo.height;
			displayInfo.width = maxDimensions.width;
			displayInfo.height = imageInfo.height * displayInfo.resizeValue;
		}
	} else {
		// if original width or height is equal or lower than maximum possibe width or height,
		// set resize proportion to 1 and set display dimensions as same as original image dimensions
		setDisplayInfoAsImageInfo();
	}
}

/*
	Sets displayInfo values as same as imageInfo values and sets resizeValue to 1.
*/
function setDisplayInfoAsImageInfo() {
	displayInfo.resizeValue = 1;
	displayInfo.width = imageInfo.width;
	displayInfo.height = imageInfo.height;
}
