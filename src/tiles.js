const tileSize = 100

class Tile {
    constructor(x, y, texture = textures.tiles.sand) {
        this.position = Vector2.create(x * tileSize, y * tileSize)
        this.texture = texture

        this.physics = new PhysicsObject()
        this.physics.hitbox.transformHitbox(this.position, 1)
    }

    draw() {
        push()
        rectMode(CENTER)

        shaders.pixelated.setUniform('uTexture', this.texture)
        shader(shaders.pixelated)
        square(this.position.x, this.position.y, tileSize)

        pop()

        // this.physics.hitbox.draw()
    }
}

class Tilemap {
    constructor() {
        this.tiles = []
    }

    addTile(x, y, texture) {
        this.tiles.push(new Tile(x, y, texture))
    }

    tileAreaFill(xStart, yStart, xEnd, yEnd, texture) {
        for(let x = xStart; x <= xEnd; ++x) {
            for(let y = yStart; y <= yEnd; ++y) {
                this.addTile(x, y, texture)
            }
        }
    }

    enableAllColliders() {
        for(let i = 0; i < this.tiles.length; ++i) {
            const tile = this.tiles[i]

            tile.physics.enabled = true
        }
    }

    disableAllColliders() {
        for(let i = 0; i < this.tiles.length; ++i) {
            const tile = this.tiles[i]

            tile.physics.enabled = false
        }
    }

    draw() {
        for(let i = 0; i < this.tiles.length; ++i) {
            const tile = this.tiles[i]

            tile.draw()
        }
    }
}