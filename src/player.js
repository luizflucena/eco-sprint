var player
const playerMaxVelocity = 5

function setupPlayer() {
    player = new GameObject(createVector(width/2, height/2))
}

function drawPlayer() {
    if(keyIsDown(LEFT_ARROW)) {
        player.physics.applyForce(-0.7, 0)

        if(player.physics.velocity.x < -playerMaxVelocity)
            player.physics.velocity.x = -playerMaxVelocity
	}
	if(keyIsDown(RIGHT_ARROW)) {
        player.physics.applyForce(0.7, 0)

        if(player.physics.velocity.x > playerMaxVelocity)
            player.physics.velocity.x = playerMaxVelocity
	}

	player.draw()
}