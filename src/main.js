/* -------------------------------------------------------------------------- */
/*                                 ECO SPRINT                                 */
/* -------------------------------------------------------------------------- */

const baseWidth = 1280, baseHeight = 720
// Para manter o tamanho relativo dos objetos no canvas consistente,
// independente da resolução
var scaleProportionality, invScaleProportionality
var canvas
function setup() {
	const largura = windowWidth > 1280 ? 1280 : windowWidth
	const altura = largura * baseHeight/baseWidth
	scaleProportionality = baseHeight/altura
	invScaleProportionality = 1/scaleProportionality

	frameRate(300)
	canvas = createCanvas(largura, altura, WEBGL)
	angleMode(DEGREES)
	colorMode(RGB, 1)
	noStroke()
	textFont(fonts.extrabold)
	rectMode(CENTER)

	// allSprites.autoDraw = false

	debug = new DebugConsole()
	debug.addGauge('FPS')
	debug.addGauge('projectedFPS')
	debug.addGauge('screenSize', width + ' x ' + Math.round(height))
	debug.addGauge('playerVelocity')
	debug.addGauge('playerPos')
	debug.addGauge('free')
	debug.addGauge('free2')

	setupGui()
	setupButtonListeners()

	setupPlayer()
	setupCamera()

	setupAllScenes()
	setCurrentScene(scenes.teste) // Definir a cena inicial
}

var fpsAdjustment

function draw() {
	const performanceTimerStart = performance.now()

	const fps = debug.avgOverTime(frameRate(), 75, 'fps')
	fpsAdjustment = deltaTime * 1e-3
	// debug.updateGauge('FPS', fps.toFixed(2))
	debug.updateGauge('FPS', fps.toFixed(2))

	background(128/255, 206/255, 237/255)

	drawCurrentScene()

	const performanceTimerEnd = performance.now()
	const frameDrawTime = performanceTimerEnd - performanceTimerStart
	debug.updateGauge('projectedFPS', debug.avgOverTime(1000/frameDrawTime, 75, 'prfps').toFixed(2))
}
