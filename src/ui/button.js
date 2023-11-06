var _buttonMode = 'corner'
function buttonMode(mode) {
    _buttonMode = mode
}

class Button {
    constructor(x = 0, y = 0, width = 300, height = 100, action = () => {}) {
        if(_buttonMode === 'center') {
            x -= width/2
            y -= height/2
        }

        this.position = Vector2.create(x, y)
        this.size = Vector2.create(width, height)

        this.action = action

        this.physics = new PhysicsObject()
        this.physics.hitbox.set(x, y, x + width, y + height)
    }

    mouseOver() {
        
    }

    draw() {
        rect(this.position.x, this.position.y, this.size.x, this.size.y)
        this.physics.hitbox.draw()
    }
}