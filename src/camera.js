var orthoScale = 1.5
var camSmoothness = 0 // 0 a 1
var mainCam

function setupCamera() {
    mainCam = createCamera()
	// Movendo a câmera pra que o ponto (0, 0) seja o canto inferior esquerdo da tela,
	// e para que o valor de y aumente no sentido para cima
	// @ts-ignore
	mainCam.camera(width/2, height/2, -20, width/2, height/2, 0, 0, -1, 0)
	setCamera(mainCam)
	ortho(-width/2 * orthoScale, width/2 * orthoScale, -height/2 * orthoScale, height/2 * orthoScale)
}

function drawCamera() {
    mainCam.move(
        (player.position.x - mainCam.eyeX) * (1 - camSmoothness),
        (mainCam.eyeY - player.position.y) * (1 - camSmoothness),
        0
    )

    debug.updateGauge('free', mainCam.eyeX + ', ' + mainCam.eyeY + ', ' + mainCam.eyeZ)
}