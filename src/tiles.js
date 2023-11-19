const tileSize = 100
const tileRes = 16

class Tile {
    constructor(x, y, texture = textures.tiles.sand) {
        this.position = Vector2.create(x, y)
        this.worldPosition = Vector2.create(x * tileSize, y * tileSize)
        this.texture = texture

        // this.physics = new PhysicsObject()
        // this.physics.hitbox.transformHitbox(this.worldPosition, 1)
    }

    draw() {
        shaders.pixelated.setUniform('uTexture', this.texture)
        square(this.worldPosition.x, this.worldPosition.y, tileSize)

        // this.physics.hitbox.draw()
    }
}

class Tilemap {
    constructor() {
        this.tiles = []

        this.colliders = []
    }

    addHitbox(minX, minY, maxX, maxY) {
        const physicsObj = new PhysicsObject(this)

        if(typeof minX === 'number')
            physicsObj.hitbox.set(minX, minY, maxX, maxY)
        else
            physicsObj.hitbox.transformHitbox(minX, 1)
        
        this.colliders.push(physicsObj)

        return physicsObj.hitbox
    }

    addTile(x, y, texture, hasOwnHitbox = true) {
        for (let i = 0; i < this.tiles.length; ++i) {
            if(x === this.tiles[i].position.x && y === this.tiles[i].position.y) {
                this.tiles[i] = new Tile(x, y, texture)
                return;
            }
        }

        const tile = new Tile(x, y, texture)

        if(hasOwnHitbox)
            this.addHitbox(tile.worldPosition)

        this.tiles.push(tile)
    }

    // tileAreaFill(x1, x2, y1, y2, texture) {
    //     for(let x = x1; x <= x2; ++x) {
    //         for(let y = y1; y <= y2; ++y) {
    //             this.addTile(x, y, texture)
    //         }
    //     }

    //     const physics = new PhysicsObject(this)
    //     physics.hitbox.set(x1, y1, x2, y2)
    //     this.colliders.push(physics)
    // }

    // fonte: https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
    tileLineFill(x1, x2, y1, y2, thickness, texture) {
        const yOffset = y1 > y2 ? -1 : 1

        const dx = x2 - x1
        const dy = (y2 - y1) * yOffset
        let D = 2*dy - dx
        let y = y1

        let minX = x1*tileSize - 50, maxX
        let minY, maxY

        for (let x = x1; x <= x2; ++x) {
            if(D > 0) {
                minY = y*tileSize + 50
                maxY = (y + thickness)*tileSize + 50
                maxX = x*tileSize - 50

                if(minY > maxY) {
                    const aux = minY
                    minY = maxY
                    maxY = aux
                }

                this.addHitbox(minX, minY, maxX, maxY)
                minX = maxX

                y += yOffset
                D -= 2*dx
            }

            D += 2*dy

            for (let t = 0; t < Math.abs(thickness); ++t) {
                this.addTile(x, y + t * Math.sign(thickness), texture, false)
            }
        }

        minY = y*tileSize + 50
        maxY = (y + thickness)*tileSize + 50
        if(minY > maxY) {
            const aux = minY
            minY = maxY
            maxY = aux
        }
        maxX = x2*tileSize + 50
        this.addHitbox(minX, minY, maxX, maxY)
    }

    enableAllColliders() {
        for(let i = 0; i < this.colliders.length; ++i) {
            const collider = this.colliders[i]

            collider.enabled = true
        }
    }

    disableAllColliders() {
        for(let i = 0; i < this.colliders.length; ++i) {
            const collider = this.colliders[i]

            collider.enabled = false
        }
    }

    draw() {
        push()
        rectMode(CENTER)
        shader(shaders.pixelated)
        shaders.pixelated.setUniform('uSpriteRes', tileRes)

        for(let i = 0; i < this.tiles.length; ++i) {
            this.tiles[i].draw()
        }

        // for(let i = 0; i < this.colliders.length; ++i) {
        //     this.colliders[i].hitbox.draw()
        // }

        pop()
    }
}