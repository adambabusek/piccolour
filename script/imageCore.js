function createCanvasFromImage(image) {
	var maxDimensions = calcImageMaxDimensions();

	var canv = document.createElement("canvas");
    canv.id="canvas";
	canv.width = maxDimensions.width;
	canv.height = maxDimensions.height;
	var ctx = canv.getContext("2d");

	ctx.drawImage(image, 0, 0, maxDimensions.width, maxDimensions.height);
	return canv;
}

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
