class GameLevel {
    constructor() {
        this.tilemap = new Tilemap()
    }

    draw() {
        this.tilemap.draw()
    }
}

var levels = {
    teste: new GameLevel()
}

function setupLevels() {
    levels.teste.tilemap.tileAreaFill(0, -5, 10, 0, textures.tiles.sand)
}