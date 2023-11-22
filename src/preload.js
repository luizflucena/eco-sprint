var shaders = { pixelated: undefined, screen: undefined }
var textures = { tiles: {}, spritesheets: {}, sprites: {}, bg: {} }
var spriteSheets = { player: undefined }
var sounds = { music: {}, sfx: {} }
var fonts = { extrabold: undefined }
function preload() {
    loadAndDefineShader('pixelated')
    loadAndDefineShader('screen')

    loadAndDefineImage('tiles/sand.png')
    loadAndDefineImage('tiles/teste.png')
    loadAndDefineImage('spritesheets/characters.png', (img) => {
        sliceSpriteSheet('player', img, 4, 23)
    })
    loadAndDefineImage('bg/beach1.png')
    loadAndDefineImage('bg/beach2.png')
    loadAndDefineImage('bg/beach3.png')
    loadAndDefineImage('bg/beach4.png')

    loadAndDefineSound('music/wanko05.mp3')
    loadAndDefineSound('sfx/ocean.mp3')
    loadAndDefineSound('sfx/jump.wav')
    loadAndDefineSound('sfx/trash.wav')
    loadAndDefineSound('sfx/start.wav')

    fonts.extrabold = loadFont('assets/fonts/OpenSans-ExtraBold.ttf')
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