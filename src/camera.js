var mainCam
var orthoScale = 1
var cameraSmoothness = 0.8 // 0 a 1

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
}

function drawCamera() {
	// Movimentação da câmera acompanhando o jogador
    cameraPosition.set(mainCam.eyeX, mainCam.eyeY, mainCam.eyeZ)
    Vector2.lerp(cameraPosition, player.position, /* fpsAdjustment * 10 */ 1)
    mainCam.setPosition(cameraPosition.x, cameraPosition.y, -20)
}