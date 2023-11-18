var player
const playerMaxVelocity = 10

function setupPlayer() {
    player = new GameObject(Vector2.create(300, 100))
    player.physics.enabled = true
    player.physics.dynamic = true
    player.physics.friction = 0.25
    // player.physics.horizontalDrag = 0.15
}

function drawPlayer() {
    debug.updateGauge('free', player.physics.grounded)

    if(keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        player.physics.applyForce(-50 * fpsAdjustment, 0)

        if(player.physics.velocity.x < -playerMaxVelocity)
            player.physics.velocity.x = -playerMaxVelocity
	}
	if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        player.physics.applyForce(50 * fpsAdjustment, 0)

        if(player.physics.velocity.x > playerMaxVelocity)
            player.physics.velocity.x = playerMaxVelocity
	}
    if(keyIsDown(UP_ARROW) || keyIsDown(87) || keyIsDown(32)) {
        if(player.physics.grounded)
            player.physics.velocity.y = 13
    }

    if(player.physics.velocity.y < 0) {
        player.physics.gravity = 1.5 * defaultGravity
    } else {
        player.physics.gravity = defaultGravity
    }

	player.draw()
    debug.updateGauge('playerVelocity', player.physics.velocity.x)
    debug.updateGauge('playerPos', player.position.x)
}