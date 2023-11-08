/* -------------------------------------------------------------------------- */
/*                                 ECO SPRINT                                 */
/* -------------------------------------------------------------------------- */

// Para manter o tamanho dos objetos no canvas consistente, independente
// da resolução, de acordo com seu tamanho em um canvas 1280x720
var scaleProportionality, inverseScaleProportionality
var canvas
function setup() {
	const largura = windowWidth > 1280 ? 1280 : windowWidth
	const altura = largura * 9/16
	scaleProportionality = 720/altura
	inverseScaleProportionality = 1/scaleProportionality

	frameRate(300)
	canvas = createCanvas(largura, altura, WEBGL)
	angleMode(DEGREES)
	colorMode(RGB, 1)
	noStroke()

	allSprites.autoDraw = false

	debug = new DebugConsole()
	debug.addGauge('FPS')
	debug.addGauge('screenSize', width + ' x ' + Math.round(height))
	debug.addGauge('guiWorldMousePos')
	debug.addGauge('playerPos')
	debug.addGauge('free')
	debug.addGauge('free2')

	setupGui()
	setupButtonListeners()

	setupLevels()
	setupPlayer()
	setupCamera()

	setupAllScenes()
	setCurrentScene(scenes.controles) // Definir a cena inicial
}

var fpsAdjustment = 1/75 // O deltaTime às vezes não deixa a animação suave

function draw() {
	const fps = avgFPS(75)
	fpsAdjustment = fps <= 0 ? fpsAdjustment : 1/Math.round(fps)
	debug.updateGauge('FPS', fps.toFixed(2))

	background(0.7)

	drawCurrentScene()
}
