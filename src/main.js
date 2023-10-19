function setup() {
	const largura = windowWidth > 1280 ? 1280 : windowWidth
	const altura = largura * 9/16
	createCanvas(largura, altura, WEBGL)
	angleMode(DEGREES)
	colorMode(RGB, 1)
	ortho()
}

function draw() {
	background(0.5);

	rotateY(millis() * 5e-2)
	box(50, 50, 50)
}
