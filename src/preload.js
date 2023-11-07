var shaders = {}
var textures = { tiles: {} }
var fonts = { extrabold: undefined }
function preload() {
    shaders = {
        pixelated: loadShader('shaders/pixelated.vert', 'shaders/pixelated.frag'),
        screen: loadShader('shaders/screen.vert', 'shaders/screen.frag')
    }

    textures.tiles = {
        sand: loadImage('assets/tiles/sand.png'),
        teste: loadImage('assets/tiles/teste.png')
    }

    fonts.extrabold = loadFont('fonts/OpenSans-ExtraBold.ttf')
}