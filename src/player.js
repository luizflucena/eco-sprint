var player

function setupPlayer() {
    player = new GameObject(createVector(width/2, height/2))
}

function drawPlayer() {
    if(keyIsDown(LEFT_ARROW)) {
		player.move(-10, 0)
	}
	if(keyIsDown(RIGHT_ARROW)) {
		player.move(10, 0)
	}
	player.draw()
}