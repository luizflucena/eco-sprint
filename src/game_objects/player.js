class Player extends GameObject {
    constructor(position = Vector2.zero, scale = Vector2.one) {
        super(position, scale)

        this.maxVelocity = 10
        this.animations = { walk: undefined, run: undefined, idle: undefined }
        this.directionX = 1
    }

    walkLeft() {
        player.physics.applyForce(-50 * fpsAdjustment, 0)

        if(player.physics.velocity.x < -player.maxVelocity)
            player.physics.velocity.x = -player.maxVelocity
    }

    walkRight() {
        player.physics.applyForce(50 * fpsAdjustment, 0)

        if(player.physics.velocity.x > player.maxVelocity)
            player.physics.velocity.x = player.maxVelocity
    }

    jump() {
        if(this.physics.grounded) this.physics.velocity.y = 13
    }
}

var player = new Player(Vector2.create(300, 100))

function setupPlayer() {
    player.physics.enabled = true
    player.physics.dynamic = true
    player.physics.friction = 0.25
    player.physics.hitbox.localMin.add(25, 0)
    player.physics.hitbox.localMax.sub(25, 20)

    player.animations.walk = new GameAnimation(spriteSheets.player, 10,
        spriteSheets.player.getSpriteIndex(0, 2),
        spriteSheets.player.getSpriteIndex(3, 2)
    )
    player.animations.run = new GameAnimation(spriteSheets.player, 8,
        spriteSheets.player.getSpriteIndex(14, 2),
        spriteSheets.player.getSpriteIndex(17, 2)
    )
    player.animations.idle = spriteSheets.player.getSprite(0, 2)

    player.sprite = player.animations.idle
}

function drawPlayer() {
    if(keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        player.directionX = -1
        player.walkLeft()
	}
	if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        player.directionX = 1
        player.walkRight()
	}
    if(keyIsDown(UP_ARROW) || keyIsDown(87) || keyIsDown(32)) {
        player.jump()
    }

    if(player.physics.velocity.y < 0) {
        player.physics.gravity = 1.5 * defaultGravity
    } else {
        player.physics.gravity = defaultGravity
    }

    if(Math.sign(player.scale.x) !== player.directionX)
        player.scale.x *= -1

    // player.physics.hitbox.draw()
    player.draw()

    if(player.physics.velocity.x !== 0)
        if(Math.abs(player.physics.velocity.x) < 8.8) {
            player.changeAnimation(player.animations.walk, { setFrame: player.animations.run.currentAnimationFrame + 1 })
        }
        else {
            player.changeAnimation(player.animations.run, { setFrame: player.animations.walk.currentAnimationFrame + 1 })
        }
    else
        player.removeAnimation()

    debug.updateGauge('playerVelocity', player.physics.velocity.x)
    debug.updateGauge('playerPos', player.position.x)
}