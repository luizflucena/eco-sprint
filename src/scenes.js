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

        const groundTilemap = new Tilemap()
        groundTilemap.tileLineFill(-10, 66, 0, -5, -6, textures.tiles.sand)
        groundTilemap.tileLineFill(67, 100, -5, -5, -6, textures.tiles.sand)
        groundTilemap.addTile(20, -1, textures.tiles.teste)
        sceneScope.groundTilemap = groundTilemap

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
            sceneScope.trashCount += 1
        })
        sceneScope.lixo1 = lixo1

        const lowerLevelLimit = new PhysicsObject()
        lowerLevelLimit.enabled = true
        lowerLevelLimit.trigger = true
        lowerLevelLimit.hitbox.set(-1e5, -1e5, 1e5, -3000)
        lowerLevelLimit.setCollisionCallback(() => {
            player.position.set(300, 100)
            player.physics.velocity.set(0, 0)
        })
        sceneScope.lowerLevelLimit = lowerLevelLimit
    },

    draw: (ctx) => {
        const sceneScope = ctx.variables

        sceneScope.groundTilemap.draw()
        drawPlayer()
        if(sceneScope.lixo1.physics.enabled)
            sceneScope.lixo1.draw()

        drawCamera()
        drawGui(() => {
            rectMode(CENTER)
            textAlign(LEFT, TOP)
            textSize(50)
            text(sceneScope.trashCount + (sceneScope.trashCount === 1 ? ' lixo coletado' : ' lixos coletados'),
                -baseWidth/2 + 10, -baseHeight/2)
        })
    },

    onEnable: (ctx) => {
        const sceneScope = ctx.variables

        sceneScope.trashCount = 0

        sceneScope.groundTilemap.enableAllColliders()
    },

    onDisable: (ctx) => {
        const sceneScope = ctx.variables

        sceneScope.groundTilemap.disableAllColliders()
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