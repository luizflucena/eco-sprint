class Trash extends GameObject {
    constructor(x, y, callback = () => {}) {
        super(Vector2.create(x, y))

        this.physics.tag = 'trash'
        this.physics.enabled = true
        this.physics.dynamic = true
        this.physics.setCollisionCallback(() => {
            callback()
            if(!sounds.sfx.trash.isPlaying())
                sounds.sfx.trash.play()
            this.disable()
        })
    }
}