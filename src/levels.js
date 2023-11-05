class Level {
    constructor() {
        this.tilemap = new Tilemap()
    }

    draw() {
        this.tilemap.draw()
    }
}
var levels = {
    teste: new Level()
}

function setupLevels() {
    levels.teste.tilemap.tileAreaFill(0, -5, 10, 0, textures.tiles.sand)
}

function drawLevels() {
    levels.teste.draw()
}