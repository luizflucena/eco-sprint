class GameObject {
    constructor(
        position = Vector2.zero,
        scale = Vector2.one
    ) {
        this.position = position
        this.scale = scale

        // this.sprite = new Sprite(0, 0, 100, 100, 'none')

        this.physics = new PhysicsObject(this)
        // Inicializar a hitbox com a mesma posição e escala iniciais do objeto
        this.physics.hitbox.transformHitbox(this.position, this.scale)
    }

    draw() {
        push()
        
        translate(this.position)
        scale(this.scale)
        // this.sprite.draw()
        square(0, 0, 100)
        
        pop()
        
        // this.physics.hitbox.draw()
        this.physics.updatePosition(this.position)
    }
}