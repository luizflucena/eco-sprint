class GameObject {
    constructor(
        position = Vector2.zero,
        scale = Vector2.one
    ) {
        this.position = position
        this.scale = scale

        this.physics = new PhysicsObject()
        // Inicializar a hitbox com a mesma posição e escala iniciais do objeto
        this.physics.hitbox.transformHitbox(this.position, this.scale)
    }

    move(x, y) {
        this.position.x += x
        this.position.y += y
    }

    draw() {
        push()
        resetMatrix()
        rectMode(CENTER)
        
        this.physics.enabled = true
        this.physics.updatePosition(this.position)
        this.physics.hitbox.draw()

        translate(this.position)
        scale(this.scale)
        circle(0, 0, 100)

        pop()
    }
}