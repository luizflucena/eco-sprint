var mainCam
function setup() {
	const largura = windowWidth > 1280 ? 1280 : windowWidth
	const altura = largura * 9/16
	frameRate(300)
	createCanvas(largura, altura, WEBGL)
	angleMode(DEGREES)
	colorMode(RGB, 1)

	mainCam = createCamera()
	// Movendo a câmera pra que o ponto (0, 0) seja o canto inferior esquerdo da tela,
	// e para que o valor de y aumente no sentido para cima
	// @ts-ignore
	mainCam.camera(width/2, height/2, -20, width/2, height/2, 0, 0, -1, 0)
	setCamera(mainCam)
	ortho()

	debug = new DebugConsole()
	debug.addGauge('screenSize', width + ' x ' + Math.round(height))
	debug.addGauge('free')

	setupLevels()
	setupPlayer()
}

function draw() {
	background(0.5)

	drawPlayer()

	levelGround.hitbox.draw()
}
