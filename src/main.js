function setup() {
	const largura = windowWidth > 1280 ? 1280 : windowWidth
	const altura = largura * 9/16
	createCanvas(largura, altura, WEBGL)
	angleMode(DEGREES)
	colorMode(RGB, 1)
	ortho()

	debug = new DebugConsole()
}

function draw() {
	background(0.5)
	push()

	translate(-width * 0.5, -height * 0.5)
	line(0, height - 50, width, height - 50)

	pop()

	if(keyIsDown(LEFT_ARROW)) {
		player.move(-10, 0)
	}
	if(keyIsDown(RIGHT_ARROW)) {
		player.move(10, 0)
	}
	player.draw()
}
