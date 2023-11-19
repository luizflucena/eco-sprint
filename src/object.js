class GameObject {
    constructor(
        position = Vector2.zero,
        scale = Vector2.one
    ) {
        this.position = position
        this.scale = scale

        this.sprite = undefined
        this.spriteResolution = 16

        this.physics = new PhysicsObject(this)
        // Inicializar a hitbox com a mesma posição e escala iniciais do objeto
        this.physics.hitbox.transformHitbox(this.position, this.scale)
    }

    draw() {
        push()
        
        translate(this.position)
        scale(this.scale)
        if(this.sprite !== undefined) {
            const img = this.sprite instanceof GameAnimation ? this.sprite.currentImage : this.sprite

            shader(shaders.pixelated)
            shaders.pixelated.setUniform('uTexture', img)
            shaders.pixelated.setUniform('uSpriteRes', this.spriteResolution)
        }
        square(0, 0, 100)
        
        pop()
        
        // this.physics.hitbox.draw()
        this.physics.updatePosition(this.position)
    }
}