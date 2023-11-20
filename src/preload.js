var shaders = { pixelated: undefined, screen: undefined }
var textures = { tiles: {}, spritesheets: {}, sprites: {} }
var spriteSheets = { player: undefined }
var fonts = { extrabold: undefined }
function preload() {
    loadAndDefineShader('pixelated')
    loadAndDefineShader('screen')

    loadAndDefineImage('tiles/sand.png')
    loadAndDefineImage('tiles/teste.png')
    loadAndDefineImage('spritesheets/characters.png', (img) => {
        sliceSpriteSheet('player', img, 4, 23)
    })

    fonts.extrabold = loadFont('assets/fonts/OpenSans-ExtraBold.ttf')
}

function loadAndDefineImage(path, successCallback = () => {}) {
    const splitPath = path.split('/')
    const name = splitPath[splitPath.length - 1].split('.')[0]
    const obj = splitPath.length === 1 ? textures : textures[splitPath[0]]

    obj[name] = loadImage('assets/textures/' + path, successCallback)
}

function loadAndDefineShader(name) {
    shaders[name] = loadShader('assets/shaders/' + name + '.vert', 'assets/shaders/' + name + '.frag')
}