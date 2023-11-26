var shaders = { pixelated: undefined, screen: undefined, parallax: undefined }
var textures = { tiles: {}, spritesheets: {}, sprites: {}, bg: {} }
var spriteSheets = { player: undefined, sand: undefined }
var sounds = { music: {}, sfx: {} }
var fonts = { regular: undefined, bold: undefined, extrabold: undefined, square: undefined }
function preload() {
    loadAndDefineShader('pixelated')
    loadAndDefineShader('screen')
    loadAndDefineShader('parallax')

    loadAndDefineImage('tiles/sand.png')
    loadAndDefineImage('tiles/teste.png')
    loadAndDefineImage('spritesheets/characters.png', (img) => {
        sliceSpriteSheet('player', img, 4, 23)
    })
    loadAndDefineImage('spritesheets/sand.png', (img) => {
        sliceSpriteSheet('sand', img, 6, 10)
    })
    loadAndDefineImage('bg/beach1.png')
    loadAndDefineImage('bg/beach2.png')
    loadAndDefineImage('bg/beach3.png')
    loadAndDefineImage('bg/beach4.png')
    loadAndDefineImage('bg/creditos.jpg')
    loadAndDefineImage('bg/menu.png')
    loadAndDefineImage('sprites/umbrella.png')
    loadAndDefineImage('sprites/bins.png')
    loadAndDefineImage('logo.png')
    loadAndDefineImage('logo_glow.png')
    loadAndDefineImage('gradient.png')
    loadAndDefineImage('gradient_inverse.png')

    loadAndDefineSound('music/wanko05.mp3')
    loadAndDefineSound('sfx/ocean.mp3')
    loadAndDefineSound('sfx/jump.wav')
    loadAndDefineSound('sfx/trash.wav')
    loadAndDefineSound('sfx/start.wav')
    loadAndDefineSound('sfx/jump2.wav')
    loadAndDefineSound('sfx/click.wav')

    fonts.regular = loadFont('assets/fonts/Karla-Regular.ttf')
    fonts.bold = loadFont('assets/fonts/Karla-Bold.ttf')
    fonts.extrabold = loadFont('assets/fonts/Karla-ExtraBold.ttf')
    fonts.square = loadFont('assets/fonts/Square.ttf')
}

/* -------------------------------------------------------------------------- */

function loadAndDefineImage(path, successCallback = () => {}) {
    const splitPath = path.split('/')
    const name = splitPath[splitPath.length - 1].split('.')[0]
    const obj = splitPath.length === 1 ? textures : textures[splitPath[0]]

    obj[name] = loadImage('assets/textures/' + path, successCallback)
}

function loadAndDefineSound(path, successCallback = () => {}) {
    const splitPath = path.split('/')
    const name = splitPath[splitPath.length - 1].split('.')[0]
    const obj = splitPath.length === 1 ? sounds : sounds[splitPath[0]]

    obj[name] = loadSound('assets/sounds/' + path, successCallback)
}

function loadAndDefineShader(name) {
    shaders[name] = loadShader('assets/shaders/' + name + '.vert', 'assets/shaders/' + name + '.frag')
}