var shaders = {}
var textures = { tiles: {} }
var fonts = { extrabold: undefined }
function preload() {
    loadAndDefineShader('pixelated')
    loadAndDefineShader('screen')

    loadAndDefineImage('tiles/sand.png')
    loadAndDefineImage('tiles/teste.png')

    fonts.extrabold = loadFont('fonts/OpenSans-ExtraBold.ttf')
}

function loadAndDefineImage(path) {
    const splitPath = path.split('/')
    const name = splitPath[splitPath.length - 1].split('.')[0]
    const obj = splitPath.length === 1 ? textures : textures[splitPath[0]]

    obj[name] = loadImage('assets/textures/' + path)
}

function loadAndDefineShader(name) {
    shaders[name] = loadShader('shaders/' + name + '.vert', 'shaders/' + name + '.frag')
}