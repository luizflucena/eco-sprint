class SpriteSheet {
    constructor(rows, columns, spriteResolution = 16) {
        this.rows = rows
        this.columns = columns
        this.spriteRes = spriteResolution
        this.images = []
    }

    getSpriteIndex(x, y) {
        return x + y * this.columns
    }

    getSprite(x, y) {
        return this.images[this.getSpriteIndex(x, y)]
    }
}

class GameAnimation {
    constructor(spriteSheet, speed, from, to) {
        this.spriteSheet = spriteSheet
        this.speed = speed
        this.from = from || 0
        this.to = to || this.spriteSheet.images.length - 1

        this._currentSpriteIndex = this.from
        this._frameCount = 0
        this._paused = false
    }

    get currentImage() {
        const images = this.spriteSheet.images

        if(this._frameCount >= this.speed) {
            if(this._currentSpriteIndex === this.to)
                this._currentSpriteIndex = this.from
            else
                this._currentSpriteIndex += 1

            this._frameCount = 0
        }
        
        this._frameCount += 1

        return images[this._currentSpriteIndex]
    }

    pause() {

    }
}

function sliceSpriteSheet(name, fullImage, rowCount, columnCount) {
    const spriteWidth = fullImage.width/columnCount
    const spriteHeight = fullImage.height/rowCount
    const sheet = new SpriteSheet(rowCount, columnCount, spriteWidth)

    for(let y = 0; y < rowCount; ++y)
    for(let x = 0; x < columnCount; ++x) {
        const img = fullImage.get(x*spriteWidth, y*spriteHeight, spriteWidth, spriteHeight)
        img.loadPixels()

        let empty = true
        for (let i = 3; i < img.pixels.length; i += 4) {
            if(img.pixels[i] !== 0) {
                empty = false
                break;
            }
        }

        if(!empty)
            sheet.images.push(img)
    }

    spriteSheets[name] = sheet
}