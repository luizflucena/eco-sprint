var mainCam
var orthoScale = 2
var camSmoothness = Vector2.create(0.2, 0.5)

var cameraPosition = Vector2.zero

function setupCamera() {
	orthoScale *= scaleProportionality

    mainCam = createCamera()
	// Movendo a câmera pra que o ponto (0, 0) seja o canto inferior esquerdo da tela,
	// e para que o valor de y aumente no sentido para cima
	// @ts-ignore
	mainCam.camera(width/2, height/2, -20, width/2, height/2, 0, 0, -1, 0)
	setCamera(mainCam)
	ortho(-width/2 * orthoScale, width/2 * orthoScale, -height/2 * orthoScale, height/2 * orthoScale)

	// camSmoothness.set(0.0001, 0.0001)
}

var positionOfDirectionChange = 0
var directionBuffer = 1
var cameraAhead = 1
var cameraAheadBuffer = 1
function drawCamera() {
	const smoothnessX = deltaTimeSeconds/camSmoothness.x
	const smoothnessY = deltaTimeSeconds/camSmoothness.y

	// Movimentação da câmera acompanhando o jogador
	mainCam.setPosition(
		lerp(mainCam.eyeX, player.position.x + cameraAhead, smoothnessX),
		lerp(mainCam.eyeY, player.position.y, smoothnessY),
		-20
	)

	if(player.directionX !== directionBuffer) {
		positionOfDirectionChange = player.position.x
		cameraAheadBuffer = cameraAhead
	}
	directionBuffer = player.directionX

	const signedDistFromDirectionChange = player.position.x - positionOfDirectionChange

	if(Math.sign(signedDistFromDirectionChange) > 0) {
		cameraAhead = Math.min(cameraAheadBuffer + signedDistFromDirectionChange/2, 400)
	} else {
		cameraAhead = Math.max(cameraAheadBuffer + signedDistFromDirectionChange/2, -400)
	}

	debug.updateGauge('free2', Math.abs(signedDistFromDirectionChange))
}