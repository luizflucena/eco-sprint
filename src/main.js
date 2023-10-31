var mainCam
function setup() {
	const largura = windowWidth > 1280 ? 1280 : windowWidth
	const altura = largura * 9/16
	createCanvas(largura, altura, WEBGL)
	angleMode(DEGREES)
	colorMode(RGB, 1)

	mainCam = createCamera()
	// @ts-ignore
	mainCam.camera(width/2, height/2, -20, width/2, height/2, 0, 0, -1, 0)
	setCamera(mainCam)
	ortho()

	debug = new DebugConsole()
	debug.addGauge('free')

	setupLevels()
	setupPlayer()
}

function draw() {
	background(0.5)

	drawPlayer()

	levelGround.hitbox.draw()
}
