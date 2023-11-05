var shaders = {}
var textures = { tiles: {} }
function preload() {
    shaders = {
        pixelated: loadShader('shaders/pixelated.vert', 'shaders/pixelated.frag')
    }

    textures.tiles = {
        sand: loadImage('assets/tiles/sand.png'),
        teste: loadImage('assets/tiles/teste.png')
    }
}