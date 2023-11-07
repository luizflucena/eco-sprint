/* -------------------------------------------------------------------------- */
/*                                 ECO SPRINT                                 */
/* -------------------------------------------------------------------------- */

var canvas
function setup() {
	const largura = windowWidth > 1280 ? 1280 : windowWidth
	const altura = largura * 9/16

	frameRate(300)
	canvas = createCanvas(largura, altura, WEBGL)
	angleMode(DEGREES)
	colorMode(RGB, 1)
	noStroke()

	allSprites.autoDraw = false

	debug = new DebugConsole()
	debug.addGauge('FPS')
	debug.addGauge('screenSize', width + ' x ' + Math.round(height))
	debug.addGauge('mousePos')
	debug.addGauge('playerPos')
	debug.addGauge('free')
	debug.addGauge('free2')

	setupGui()

	setupLevels()
	setupPlayer()
	setupCamera()

	setupAllScenes()
	setCurrentScene(scenes.menu)
}

var fpsAdjustment = 1/75 // O deltaTime às vezes não deixa a animação suave

function draw() {
	const fps = avgFPS(75)
	fpsAdjustment = fps <= 0 ? fpsAdjustment : 1/Math.round(fps)
	debug.updateGauge('FPS', fps.toFixed(2))
	debug.updateGauge('mousePos', (mouseX - width/2) + ',' + (mouseY - height/2))

	background(0.7)

	// drawLevels()
	// drawPlayer()
	// drawCamera()
	drawCurrentScene()
}
