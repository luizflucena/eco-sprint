function setup() {
	const largura = windowWidth > 1280 ? 1280 : windowWidth
	const altura = largura * 9/16

	frameRate(300)
	createCanvas(largura, altura, WEBGL)
	angleMode(DEGREES)
	colorMode(RGB, 1)
	noStroke()

	debug = new DebugConsole()
	debug.addGauge('screenSize', width + ' x ' + Math.round(height))
	debug.addGauge('free')

	setupLevels()
	setupPlayer()
	setupCamera()
}

function draw() {
	background(0.5)

	drawLevels()
	drawPlayer()
	drawCamera()
}
