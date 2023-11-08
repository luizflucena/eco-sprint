class Scene {
    constructor(name = 'cena', functions = {}
    ) {
        this.name = name

        // Devem ser definidas apenas no constructor
        this.setup = () => { if(functions.setup) functions.setup(this) }
        this.draw = () => { if(functions.draw) functions.draw(this) }
        this.onEnable = () => { if(functions.onEnable) functions.onEnable(this) } // Roda uma vez quando a cena é definida como a ativa
        this.onDisable = () => { if(functions.onDisable) functions.onDisable(this) } // Roda uma vez quando a cena é desativada

        this.variables = {}
    }
}

const scenes = {}

/* -------------------------------------------------------------------------- */

scenes.menu = new Scene('menu', {
    setup: (ctx) => {
        const sceneScope = ctx.variables
        const buttons = sceneScope.buttons = []

        buttonMode(CENTER)

        const jogar = new Button('Jogar', 0, -120, 400, 100, {
            onClick: () => {
                debug.log('jogar')
                setCurrentScene(scenes.teste)
            }
        })
        jogar.text.offsetY = -15
        buttons.push(jogar)

        const controles = new Button('Controles', 0, 0, 400, 100, {
            onClick: () => {
                debug.log('controles')
                setCurrentScene(scenes.controles)
            }
        })
        controles.text.offsetY = -10
        buttons.push(controles)

        const creditos = new Button('Créditos', 0, 120, 400, 100, {
            onClick: () => {
                debug.log('créditos')
            }
        })
        creditos.text.offsetY = -10
        buttons.push(creditos)

        buttons.forEach((e) => e.borderRadius = 10)
    },

    draw: (ctx) => {
        const sceneScope = ctx.variables

        drawGui(() => {
            for (let i = 0; i < sceneScope.buttons.length; ++i) {
                sceneScope.buttons[i].draw()
            }
        })
    },

    onEnable: (ctx) => {
        const sceneScope = ctx.variables

        for (let i = 0; i < sceneScope.buttons.length; ++i) {
            sceneScope.buttons[i].enabled = true
        }
    },

    onDisable: (ctx) => {
        const sceneScope = ctx.variables

        for (let i = 0; i < sceneScope.buttons.length; ++i) {
            sceneScope.buttons[i].enabled = false
        }
    }
})

scenes.teste = new Scene('teste', {
    draw: () => {
        levels.teste.draw()
        drawPlayer()
        drawCamera()
    },

    onEnable: () => {
        levels.teste.tilemap.enableAllColliders()
    },

    onDisable: () => {
        levels.teste.tilemap.disableAllColliders()
    }
})

scenes.controles = new Scene('controles', {
    setup: (ctx) => {
        const sceneScope = ctx.variables

        const voltar = new Button('Voltar', 0, 0, 300, 100, {
            onClick: () => {
                debug.log('menu')
                setCurrentScene(scenes.menu)
            }
        })

        sceneScope.voltar = voltar
    },

    draw: (ctx) => {
        const sceneScope = ctx.variables

        drawGui(() => {
            sceneScope.voltar.draw()
        })
    },

    onEnable: (ctx) => {
        const sceneScope = ctx.variables

        sceneScope.voltar.enabled = true
    },

    onDisable: (ctx) => {
        const sceneScope = ctx.variables

        sceneScope.voltar.enabled = false
    }
})

/* -------------------------------------------------------------------------- */

function setupAllScenes() {
    for (const key in scenes) {
        scenes[key].setup()
    }
}

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

    currentScene.onEnable()
}