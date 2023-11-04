const tileSize = 100

class Tile extends GameObject {
    constructor(x, y, texture = textures.tiles.sand) {
        super(Vector2.zero.set(x * tileSize, y * tileSize))
        this.texture = texture
    }

    draw() {
        push()
        resetMatrix()
        rectMode(CENTER)
        
        // this.physics.hitbox.draw()

        texture(this.texture)
        rect(this.position.x, this.position.y, tileSize, tileSize)

        pop()
    }
}

class Tilemap {
    constructor() {
        this.tiles = []
    }

    addTile(x, y, texture) {
        this.tiles.push(new Tile(x, y, texture))
    }

    tileAreaFill(xStart, xEnd, yStart, yEnd, texture) {
        for(let x = 0; x <= xEnd - xStart; ++x) {
            for(let y = 0; y <= yEnd - yStart; ++y) {
                this.addTile(x, y, texture)
            }
        }
    }

    draw() {
        for(let i = 0; i < this.tiles.length; ++i) {
            const tile = this.tiles[i]

            tile.draw()
        }
    }
}