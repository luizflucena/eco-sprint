var player
const playerMaxVelocity = 5

function setupPlayer() {
    player = new GameObject(Vector2.create(300, 100))
    player.physics.enabled = true
    player.physics.dynamic = true
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
    if(keyIsDown(UP_ARROW)) {
        if(player.physics.grounded)
            player.physics.velocity.y = 5
    }

	player.draw()
    // debug.updateGauge('free', player.position.array())
}