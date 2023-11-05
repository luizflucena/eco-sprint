class Scene {
    constructor(name = 'cena',
        draw = () => { debug.log('Não tem nada na cena') },
        onStart = () => {},
        onDisable = () => {}
    ) {
        this.name = name

        this.draw = draw
        this.onStart = onStart // Roda uma vez quando a cena é definida como a ativa
        this.onDisable = onDisable // Roda uma vez quando a cena é desativada
    }
}

const scenes = {}

scenes.menu = new Scene('menu',
    () => {
        debug.log('tela do menu')
    }
)

scenes.teste = new Scene('teste',
    () => {
        levels.teste.draw()
        drawPlayer()
        drawCamera()
    },

    () => {
        levels.teste.tilemap.enableAllColliders()
    },

    () => {
        levels.teste.tilemap.disableAllColliders()
    }
)

// Não deve ser alterada diretamente. Em vez disso, usar setCurrentScene()
var currentScene

function drawCurrentScene() {
    if(currentScene === undefined) return;

    currentScene.draw()
}

// Não deve ser usada muito frequentemente
function setCurrentScene(scene) {
    if(currentScene !== undefined)
        currentScene.onDisable()

    currentScene = scene

    currentScene.onStart()
}