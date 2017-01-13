function createCanvasFromImage(image) {
	var canv = document.createElement("canvas");
    canv.id="canvas";
	canv.width = image.width;
	canv.height = image.height;
	var ctx = canv.getContext("2d");
	ctx.drawImage(image, 0, 0, 600, 400);
	return canv;
}
