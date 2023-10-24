class GameObject {
    constructor() {
        this.position = Vector2.zero
        this.scale = Vector2.one

        this.hitbox = new Hitbox()
    }

    move(x, y) {
        this.position.add(x, y)
    }

    draw() {
        push()
        resetMatrix()
        rectMode(CENTER)

        translate(this.position)
        scale(this.scale)
        circle(0, 0, 100)

        this.hitbox.transformHitbox(this.position, this.scale)
        this.hitbox.draw()

        pop()
    }
}