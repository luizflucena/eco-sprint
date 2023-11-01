class Level {
    constructor(name = 'fase0') {
        this.name = name
    }
}

var levelGround = new PhysicsObject()
function setupLevels() {
    levelGround.hitbox.set(0, 0, 400, 50)
}