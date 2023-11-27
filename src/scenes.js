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

        const jogar = new Button('Jogar', 440, -120, 400, 105, {
            onClick: () => {
                // sounds.sfx.start.play()
                setCurrentScene(scenes.levelSelect)
            },

            onHover: (b) => {
                b.extendLeftAnimation(400, 55)
            },

            onNotHover: (b) => {
                b.contractToOriginal(400)
            }
        })
        buttons.push(jogar)

        const controles = new Button('Controles', 440, 0, 400, 105, {
            onClick: () => {
                setCurrentScene(scenes.controles)
            },

            onHover: (b) => {
                b.extendLeftAnimation(400, 55)
            },

            onNotHover: (b) => {
                b.contractToOriginal(400)
            }
        })
        buttons.push(controles)

        const creditos = new Button('Créditos', 440, 120, 400, 105, {
            onClick: () => {
                setCurrentScene(scenes.creditos)
            },

            onHover: (b) => {
                b.extendLeftAnimation(400, 55)
            },

            onNotHover: (b) => {
                b.contractToOriginal(400)
            }
        })
        buttons.push(creditos)

        buttons.forEach((b) => {
            b.text.offsetY = -7
            b.text.offsetX = -50
            b.text.color = [1]
            b.text.align = RIGHT
            b.texture = textures.gradient_inverse
            b.borderRadius = 0
        })
    },

    draw: (ctx) => {
        const sceneScope = ctx.variables

        drawGui(() => {
            // push()

            shader(shaders.pixelated)
            shaders.pixelated.setUniform('uTexture', textures.bg.menu)
            shaders.pixelated.setUniform('uSpriteRes', [textures.bg.menu.width, textures.bg.menu.height])
            rect(0, 0, baseWidth, -baseHeight)
            resetShader()

            // pop()

            imageMode(CENTER)
            image(textures.logo_glow, -250, 0)

            for (let i = 0; i < sceneScope.buttons.length; ++i) {
                sceneScope.buttons[i].draw()
                // sceneScope.buttons[i].hitbox.draw()
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

scenes.levelSelect = new Scene('level select', {
    setup: (ctx) => {
        const sceneScope = ctx.variables
        const buttons = sceneScope.buttons = []

        buttonMode(CENTER)
        const spacing = 40

        const lvl1 = new Button('1', -50 -spacing/2, 0, 100, 100, {
            onClick: () => {
                sounds.sfx.start.play()
                setCurrentScene(scenes.teste)
            }
        })
        buttons.push(lvl1)

        const lvl2 = new Button('2', 50 + spacing/2, 0, 100, 100, {
            onClick: () => {
                sounds.sfx.start.play()
                setCurrentScene(scenes.teste)
            }
        })
        buttons.push(lvl2)

        buttonMode(CORNER)

        const voltar = new Button('Voltar', baseWidth/2 - 260, baseHeight/2 - 120, 260, 80, {
            onClick: () => {
                setCurrentScene(scenes.menu)
            }
        })
        voltar.text.color = [1]
        voltar.text.font = fonts.bold
        // @ts-ignore
        voltar.text.align = RIGHT
        voltar.text.offsetX = -30
        voltar.texture = textures.gradient_inverse
        voltar.borderRadius = 0
        buttons.push(voltar)

        buttons.forEach((b) => {
            b.text.offsetY = -7
        })
    },

    draw: (ctx) => {
        const sceneScope = ctx.variables

        drawGui(() => {
            shader(shaders.pixelated)
            shaders.pixelated.setUniform('uTexture', textures.bg.menu)
            shaders.pixelated.setUniform('uSpriteRes', [textures.bg.menu.width, textures.bg.menu.height])
            rect(0, 0, baseWidth, -baseHeight)
            resetShader()

            fill(0, 0, 0, 0.7)
            rect(0, 0, baseWidth, baseHeight)

            textAlign(CENTER, CENTER)
            fill(1)

            textFont(fonts.extrabold)
            textSize(65)
            text('Selecionar fase', 0, -200)

            for (let i = 0; i < sceneScope.buttons.length; ++i) {
                sceneScope.buttons[i].draw()
                // sceneScope.buttons[i].hitbox.draw()
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

        const level = new Level(4)

        const beachBg = new ParallaxBackground([
            textures.bg.beach1,
            textures.bg.beach2,
            textures.bg.beach3,
            textures.bg.beach4
        ], [0.2, 0.2])
        sceneScope.beachBg = beachBg

        const groundTilemap = new Tilemap()
        groundTilemap.tileLineFill(-30, -11, 10, 5, -30, textures.tiles.sand)

        groundTilemap.tileLineFill(-10, 66, 0, -5, -20, textures.tiles.sand)
        groundTilemap.tileLineFill(67, 100, -5, -5, -20, textures.tiles.sand)

        groundTilemap.tileLineFill(21, 26, -1, -1, -2, textures.tiles.sand)
        groundTilemap.tileLineFill(31, 53, 1, 3, -2, textures.tiles.sand)

        groundTilemap.tileLineFill(78, 92, 4, 1, -3, textures.tiles.sand)
        groundTilemap.tileLineFill(78, 85, 4, -3, -3, textures.tiles.sand)
        groundTilemap.tileLineFill(81, 92, 1, -2, -4, textures.tiles.sand)
        groundTilemap.tileLineFill(93, 101, 2, -3, -6, textures.tiles.sand)

        groundTilemap.tileLineFill(101, 150, -5, -10, -20, textures.tiles.sand)
        groundTilemap.tileLineFill(151, 200, -10, -10, -20, textures.tiles.sand)
        sceneScope.groundTilemap = groundTilemap

        const umbrellas = sceneScope.umbrellas = []
        umbrellas.push(new Umbrella(61, -4))
        umbrellas.push(new Umbrella(72, -4))

        const trash = sceneScope.trash = []
        trash.push(new Trash(5, 1, () => { ++sceneScope.trashCount }))
        trash.push(new Trash(67, -3, () => { ++sceneScope.trashCount }))
        trash.push(new Trash(107, -4, () => { ++sceneScope.trashCount }))
        trash.push(new Trash(150, -8, () => { ++sceneScope.trashCount }))

        const levelEnd = sceneScope.levelEnd = new TrashBin(155, -9, () => {
            level.complete(sceneScope.trashCount)
        })

        const lowerLevelLimit = new PhysicsObject()
        lowerLevelLimit.enabled = true
        lowerLevelLimit.trigger = true
        lowerLevelLimit.hitbox.set(-1e5, -1e5, 1e5, -3000)
        lowerLevelLimit.setCollisionCallback(() => {
            player.position.set(0, 600)
            player.physics.velocity.set(0, 0)
        })
        sceneScope.lowerLevelLimit = lowerLevelLimit

        const zoomOutZone = sceneScope.zoomOutZone = new PhysicsObject()
        zoomOutZone.tag = 'zoomOutZone'
        zoomOutZone.enabled = true
        zoomOutZone.trigger = true
        zoomOutZone.hitbox.set(4700, -1000, 8300, 1500)
        zoomOutZone.setCollisionEnterCallback(() => {
            lockCameraOnPoint(6600, 0)
            setCameraOrthoScale(3)
        })
        zoomOutZone.setCollisionExitCallback(() => {
            releaseCameraLock()
            setCameraOrthoScale(2)
        })

        sceneScope.fadeInOpacity = 1
        
        sceneScope.sceneTimer = 0
    },

    draw: (ctx) => {
        const sceneScope = ctx.variables
        
        sceneScope.beachBg.draw(mainCam.eyeX, mainCam.eyeY)
        
        sceneScope.groundTilemap.draw()

        for(let i = 0; i < sceneScope.trash.length; ++i) {
            sceneScope.trash[i].draw()
        }

        for(let i = 0; i < sceneScope.umbrellas.length; ++i) {
            sceneScope.umbrellas[i].draw()
        }

        sceneScope.levelEnd.draw()
        // sceneScope.levelEnd.physics.hitbox.draw()

        sceneScope.zoomOutZone.hitbox.draw()
        // if(sceneScope.zoomOutZone._isCollidingWithPlayer) {
        //     if(!sceneScope.zoomOutFlag)
        //         setCameraOrthoScale(3)

        //     sceneScope.zoomOutFlag = true
        //     sceneScope.zoomBackFlag = false
        // } else {
        //     if(!sceneScope.zoomBackFlag)
        //         setCameraOrthoScale(2)

        //     sceneScope.zoomOutFlag = false
        //     sceneScope.zoomBackFlag = true
        // }

        drawPlayer()
        
        drawCamera()
        drawGui(() => {
            rectMode(CENTER)
            textAlign(LEFT, TOP)
            textSize(50)
            text(sceneScope.trashCount + (sceneScope.trashCount === 1 ? ' lixo coletado' : ' lixos coletados'),
                -baseWidth/2 + 10, -baseHeight/2)

            if(sceneScope.fadeInOpacity !== 0) {
                fill(1, sceneScope.fadeInOpacity)
                rect(0, 0, baseWidth, baseHeight)

                if(sceneScope.sceneTimer >= 0.5)
                    sceneScope.fadeInOpacity = Math.max(sceneScope.fadeInOpacity - deltaTimeSeconds*0.75, 0)
            }
        })

        sceneScope.sceneTimer += deltaTimeSeconds
    },

    onEnable: (ctx) => {
        const sceneScope = ctx.variables

        sceneScope.trashCount = 0

        sceneScope.groundTilemap.enableAllColliders()

        sounds.sfx.ocean.play()
        sounds.music.wanko05.play(4)

        player.position.set(0, 100)
        mainCam.setPosition(player.position.x, player.position.y + 2000, -20)
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

        const voltar = new Button('Voltar', baseWidth/2 - 260, baseHeight/2 - 120, 260, 80, {
            onClick: () => {
                setCurrentScene(scenes.menu)
            }
        })
        voltar.text.offsetY = -7
        voltar.text.color = [1]
        voltar.text.font = fonts.bold
        // @ts-ignore
        voltar.text.align = RIGHT
        voltar.text.offsetX = -30
        voltar.texture = textures.gradient_inverse
        voltar.borderRadius = 0

        sceneScope.voltar = voltar
    },

    draw: (ctx) => {
        const sceneScope = ctx.variables

        drawGui(() => {
            shader(shaders.pixelated)
            shaders.pixelated.setUniform('uTexture', textures.bg.menu)
            shaders.pixelated.setUniform('uSpriteRes', [textures.bg.menu.width, textures.bg.menu.height])
            rect(0, 0, baseWidth, -baseHeight)
            resetShader()

            fill(0, 0, 0, 0.7)
            rect(0, 0, baseWidth, baseHeight)

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

        const voltar = new Button('Voltar', baseWidth/2 - 260, baseHeight/2 - 120, 260, 80, {
            onClick: () => {
                setCurrentScene(scenes.menu)
            }
        })
        voltar.text.offsetY = -7
        voltar.text.color = [1]
        voltar.text.font = fonts.bold
        // @ts-ignore
        voltar.text.align = RIGHT
        voltar.text.offsetX = -30
        voltar.texture = textures.gradient_inverse
        voltar.borderRadius = 0

        sceneScope.voltar = voltar
    },

    draw: (ctx) => {
        const sceneScope = ctx.variables

        drawGui(() => {
            shader(shaders.pixelated)
            shaders.pixelated.setUniform('uTexture', textures.bg.menu)
            shaders.pixelated.setUniform('uSpriteRes', [textures.bg.menu.width, textures.bg.menu.height])
            rect(0, 0, baseWidth, -baseHeight)
            resetShader()

            fill(0, 0, 0, 0.7)
            rect(0, 0, baseWidth, baseHeight)
            
            textAlign(CENTER, CENTER)
            fill(1)

            const y = 70

            textFont(fonts.extrabold)
            textSize(65)
            text('Criadores', 0, -270 + y)

            textFont(fonts.regular)
            textSize(45)
            text('Luiz Felipe de Lucena Lima', 0, -200 + y)
            textSize(26)
            text('luizfl.lucenalima@gmail.com', 0, -160 + y)
            textSize(45)
            text('Ana Carolina França Nunes', 0, -110 + y)
            textSize(26)
            text('carolfn14@gmail.com', 0, -70 + y)


            textFont(fonts.extrabold)
            textSize(65)
            text('Professor', 0, 40 + y)

            textFont(fonts.regular)
            textSize(45)
            text('Thales Aguiar de Lima', 0, 110 + y)

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

function setCurrentScene(scene) {
    if(currentScene !== undefined)
        currentScene.onDisable()

    currentScene = scene

    currentScene.onEnable()
}