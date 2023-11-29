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

        const jogar = new Button('Jogar', 440, -120, 440, 105, {
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

        const controles = new Button('Instruções', 440, 0, 440, 105, {
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

        const creditos = new Button('Créditos', 440, 120, 440, 105, {
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
        const updateLockedButton = (b) => {
            b.color = [0.5, 0.5]
            b.text.text = ''
            imageMode(CENTER)
            image(
                textures.lock,
                b.position.x + b.size.x/2, b.position.y + b.size.y/2,
                b.size.x - 40, b.size.y - 40
            )
        }
        const updateUnlockedButton = (b, levelNumber) => {
            b.color = [1]
            b.text.text = levelNumber + ''

            if(allLevels[levelNumber-1].isComplete) {
                imageMode(CENTER)
                image(
                    textures.check,
                    b.position.x + b.size.x - 7, b.position.y + 13,
                    64, 64
                )
            }
        }
        const levelLocked = (levelNumber) => {
            return (allLevels[levelNumber-1] === undefined || allLevels[levelNumber-1].isLocked)
        }

        const lvl1 = new Button('1', -50 -spacing/2, 0, 100, 100, {
            onClick: () => {
                if(levelLocked(1)) {
                    sounds.sfx.deny.play()
                    return;
                }

                sounds.sfx.start.play()
                setCurrentScene(scenes.teste)
            },

            onDraw: (b) => {
                if(levelLocked(1))
                    updateLockedButton(b)
            },

            drawOnTop: (b) => {
                if(!levelLocked(1))
                    updateUnlockedButton(b, 1)
            }
        })
        buttons.push(lvl1)

        const lvl2 = new Button('2', 50 + spacing/2, 0, 100, 100, {
            onClick: () => {
                if(levelLocked(2)) {
                    sounds.sfx.deny.play()
                    return;
                }
                
                sounds.sfx.start.play()
                setCurrentScene(scenes.level2)
            },

            onDraw: (b) => {
                if(levelLocked(2))
                    updateLockedButton(b)
            },

            drawOnTop: (b) => {
                if(!levelLocked(2))
                    updateUnlockedButton(b, 2)
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

        const level = sceneScope.level = new Level(4)
        level.unlock()

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
        sceneScope.collectedTrash = []

        const levelEnd = sceneScope.levelEnd = new TrashBin(155, -9)
        levelEnd.physics.setCollisionEnterCallback(() => {
            lockCameraOnPoint(levelEnd.position.x, levelEnd.position.y + 50)
            setCameraOrthoScale(0.7)
            sceneScope.playerAtLevelEndFlag = true
            player.lockControls()

            const guiHitboxes = sceneScope.trashBinGuiHitboxes = []
            // guiHitboxes[0].transformHitbox(Vector2.create(-90, 0), 1)
            const translateVector = Vector2.zero
            const scaleVector = Vector2.create(0.7, 1)
            for (let i = 0; i < 5; i++) {
                const hitbox = new Hitbox();
                const x = 90

                translateVector.set(-x*2 + x*i, 50)
                hitbox.transformHitbox(translateVector, scaleVector)

                guiHitboxes.push(hitbox)
            }
        })
        levelEnd.physics.setCollisionCallback(() => {
            if(!sceneScope.playerAtLevelEndFlag || player.position.x > 15600) return;

            player.physics.applyForce(player.acceleration * deltaTimeSeconds, 0)

            if(player.physics.velocity.x > 8.6)
                player.physics.velocity.x = 8.6
        })

        const lowerLevelLimit = new PhysicsObject()
        lowerLevelLimit.enabled = true
        lowerLevelLimit.trigger = true
        lowerLevelLimit.hitbox.set(-1e5, -1e5, 1e5, -3000)
        lowerLevelLimit.setCollisionCallback((obj) => {
            if(obj.tag !== 'player') return;

            player.position.set(0, 600)
            player.physics.velocity.set(0, 0)
        })
        sceneScope.lowerLevelLimit = lowerLevelLimit

        const zoomOutZone = sceneScope.zoomOutZone = new PhysicsObject()
        zoomOutZone.tag = 'zoomOutZone'
        zoomOutZone.enabled = true
        zoomOutZone.trigger = true
        zoomOutZone.hitbox.set(4900, -1000, 8300, 1500)
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

        // sceneScope.zoomOutZone.hitbox.draw()

        drawPlayer()
        
        drawCamera()
        drawGui(() => {
            rectMode(CENTER)
            textAlign(LEFT, TOP)
            textSize(50)
            text(
                sceneScope.collectedTrash.length + '/' + sceneScope.level.requiredTrash + ' lixos coletados',
                -baseWidth/2 + 10, -baseHeight/2
            )

            if(sceneScope.playerAtLevelEndFlag) {

                const updateTrashHitbox = (trashObj) => {
                    trashObj.physics.hitbox.set(
                        trashObj.position.x - 40, trashObj.position.y - 40 + 25,
                        trashObj.position.x + 40, trashObj.position.y + 40 + 25
                    )
                }

                if(sceneScope.trashBeingHeld !== undefined) {
                    const trashHeld = sceneScope.collectedTrash[sceneScope.trashBeingHeld]

                    trashHeld.position.set(guiMouseX, guiMouseY - 30)

                    for (let bin = 0; bin < sceneScope.trashBinGuiHitboxes.length; ++bin) {
                        const hitbox = sceneScope.trashBinGuiHitboxes[bin]
                        hitbox.draw()
                        
                        if(hitbox.testCollisionPoint(guiMouseX, guiMouseY).hasHit) {
                            trashHeld.scale.set(1.1, -1.1)
                            
                            if(!mouseIsPressed) {
                                if(trashHeld.typeIndex === bin) {
                                    trashHeld.dispose()
                                    sounds.sfx.correct.play()
                                }
                                else {
                                    sounds.sfx.incorrect.play()
                                }
                            }

                            break;
                        } else {
                            trashHeld.scale.set(1, -1)
                        }
                    }
                }

                if(!mouseIsPressed) sceneScope.trashBeingHeld = undefined

                let allTrashDisposed = true
                for (let i = 0; i < sceneScope.collectedTrash.length; ++i) {
                    const trash = sceneScope.collectedTrash[i]

                    if(trash.hasBeenDisposed) continue;
                    allTrashDisposed = false

                    if(!sceneScope.trashLaidOutFlag) {
                        trash.enabled = true
                        trash.physics.enabled = false
                        trash.position.set(i*120 - (sceneScope.collectedTrash.length - 1)*60, -200)
                        trash.scale.set(1, -1)
                    }

                    updateTrashHitbox(trash)
                    trash.draw()
                    trash.physics.hitbox.draw()

                    if(mouseIsPressed && trash.physics.hitbox.testCollisionPoint(guiMouseX, guiMouseY).hasHit && sceneScope.trashBeingHeld === undefined) {
                        sceneScope.trashBeingHeld = i

                        switch (trash.typeIndex) {
                            case 0:
                                sounds.sfx.plastic.play()
                                break;
                            
                            case 1:
                                sounds.sfx.paper.play()
                                break;

                            case 2:
                                sounds.sfx.metal.play()
                                break;

                            case 3:
                                sounds.sfx.glass.play()
                                break;

                            case 4:
                                sounds.sfx.organic.play()
                                break;
                        }
                    }
                }
                sceneScope.trashLaidOutFlag = true

                // Fase concluída
                if(allTrashDisposed) {
                    allLevels[1].unlock()
                    sceneScope.level.complete()
                }

            }

            if(sceneScope.fadeInOpacity !== 0) {
                fill(1, sceneScope.fadeInOpacity)
                rect(0, 0, baseWidth, baseHeight)

                if(sceneScope.sceneTimer >= 0.5)
                    sceneScope.fadeInOpacity = Math.max(sceneScope.fadeInOpacity - deltaTimeSeconds*0.75, 0)
            }
        })
        drawPauseMenu()

        sceneScope.sceneTimer += deltaTimeSeconds
    },

    onEnable: (ctx) => {
        const sceneScope = ctx.variables

        gameIsPausable = true

        sceneScope.playerAtLevelEndFlag = false

        sceneScope.trash.length = 0
        sceneScope.collectedTrash.length = 0
        
        const trash = sceneScope.trash
        trash.push(new Trash(5, 1))
        trash.push(new Trash(67, -3))
        trash.push(new Trash(107, -4))
        trash.push(new Trash(150, -8))
        trash.forEach((t) => {
            t.setPickupCallback(() => {
                sceneScope.collectedTrash.push(t)
            })
        })

        sceneScope.groundTilemap.enableAllColliders()

        sounds.sfx.ocean.play()
        sounds.music.wanko05.play(4)

        player.unlockControls()
        player.position.set(15200, 100)

        mainCam.setPosition(player.position.x, player.position.y + 2000, -20)
        setCameraOrthoScale(defaultOrthoScale)
    },

    onDisable: (ctx) => {
        const sceneScope = ctx.variables

        gameIsPausable = false

        sceneScope.trash.forEach((t) => {
            t.disable()
        })

        sceneScope.groundTilemap.disableAllColliders()

        sounds.sfx.ocean.stop()
        sounds.music.wanko05.stop()

        player.physics.reset()

        releaseCameraLock()
    }
})

scenes.level2 = new Scene('level2', {
    setup: (ctx) => {
        const sceneScope = ctx.variables

        const level = sceneScope.level = new Level(6)
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

function setCurrentScene(scene, optionalVariables = {}) {
    if(currentScene !== undefined)
        currentScene.onDisable()

    currentScene = scene

    Object.assign(currentScene.variables, optionalVariables)

    currentScene.onEnable()
}