/* -------------------------------------------------------------------------- */
/*                                 ECO SPRINT                                 */
/* -------------------------------------------------------------------------- */

function setup() {
	const largura = windowWidth > 1280 ? 1280 : windowWidth
	const altura = largura * 9/16

	frameRate(300)
	createCanvas(largura, altura, WEBGL)
	angleMode(DEGREES)
	colorMode(RGB, 1)
	noStroke()

	allSprites.autoDraw = false

	debug = new DebugConsole()
	debug.addGauge('FPS')
	debug.addGauge('screenSize', width + ' x ' + Math.round(height))
	debug.addGauge('free')
	debug.addGauge('free2')

	setupLevels()
	setupPlayer()
	setupCamera()
}

var fpsAdjustment = 1/75 // O deltaTime às vezes não deixa a animação suave

function draw() {
	const fps = avgFPS(75)
	fpsAdjustment = fps <= 0 ? fpsAdjustment : 1/Math.round(fps)
	debug.updateGauge('FPS', fps.toFixed(2))

	background(0.5)

	drawLevels()
	drawPlayer()
	drawCamera()
}
