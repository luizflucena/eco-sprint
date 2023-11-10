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
                setCurrentScene(scenes.creditos)
            }
        })
        creditos.text.offsetY = -10
        buttons.push(creditos)

        // buttons.forEach((e) => e.borderRadius = 10)
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
    setup: (ctx) => {
        const sceneScope = ctx.variables

        const inimigo1 = new Enemy(Vector2.create(500, 200))
        // inimigo1.physics.enabled = true
        // inimigo1.physics.dynamic = true
        sceneScope.inimigo1 = inimigo1

        const lixo1 = new Trash(Vector2.create(500, 200))
        lixo1.physics.enabled = true
        lixo1.physics.dynamic = true
        // lixo1.physics.trigger = true
        lixo1.physics.setCollisionCallback((ctx) => {
            ctx.enabled = false
        })
        sceneScope.lixo1 = lixo1
    },

    draw: (ctx) => {
        const sceneScope = ctx.variables

        levels.teste.draw()
        drawPlayer()
        if(sceneScope.lixo1.physics.enabled)
            sceneScope.lixo1.draw()

        drawCamera()
        drawGui(() => {
            rectMode(CENTER)
            textAlign(LEFT, TOP)
            textSize(50)
            text(Math.round(player.position.x * 1e-2) + ' pontos', -baseWidth/2 + 10, -baseHeight/2)
        })
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

        buttonMode(CORNER)

        const voltar = new Button('Voltar', baseWidth/2 - 260 - 10, baseHeight/2 - 100 - 10, 260, 100, {
            onClick: () => {
                debug.log('menu')
                setCurrentScene(scenes.menu)
            }
        })
        voltar.text.offsetY = -8

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

scenes.creditos = new Scene('creditos', {
    setup: (ctx) => {
        const sceneScope = ctx.variables

        buttonMode(CORNER)

        const voltar = new Button('Voltar', baseWidth/2 - 260 - 10, baseHeight/2 - 100 - 10, 260, 100, {
            onClick: () => {
                debug.log('menu')
                setCurrentScene(scenes.menu)
            }
        })
        voltar.text.offsetY = -8

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