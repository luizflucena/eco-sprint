class Scene {
    constructor(name = 'cena',
        draw = (ctx) => { debug.log('Não tem nada na cena') },
        onStart = (ctx) => {},
        onDisable = (ctx) => {}
    ) {
        this.name = name

        // Devem ser definidas apenas no constructor
        this.draw = () => { draw(this) }
        this.onStart = () => { onStart(this) } // Roda uma vez quando a cena é definida como a ativa
        this.onDisable = () => { onDisable(this) } // Roda uma vez quando a cena é desativada

        this.variables = {}
    }
}

const scenes = {}

scenes.menu = new Scene('menu',
    (ctx) => {
        const sceneScope = ctx.variables

        drawGui(() => {
            sceneScope.testButton.draw()
        })
    },

    (ctx) => {
        const sceneScope = ctx.variables

        buttonMode(CENTER)
        sceneScope.testButton = new Button(0, 0, 300, 100)
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
        setupCamera()
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