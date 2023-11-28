var gameIsPaused = false
var gameIsPausable = false
var pauseMenuButtons = []

function setupPauseMenu() {
    buttonMode(CENTER)
    pauseMenuButtons.push(new Button('Voltar ao menu', 0, 0, 400, 200, {
        onClick: () => {
            pauseGameToggle()
            setCurrentScene(scenes.menu)
        }
    }))

    pauseMenuButtons.forEach((b) => {
        if(gameIsPaused)
            b.enabled = true

        b.text.offsetY = -7
        b.color = [0.5]
    })
}

function pauseGameToggle() {
    if(!gameIsPausable) return;

    if(gameIsPaused) {
        gameIsPaused = false
        pauseMenuButtons.forEach((b) => {
            b.enabled = false
        })
    } else {
        gameIsPaused = true
        pauseMenuButtons.forEach((b) => {
            b.enabled = true
        })
    }
}

function drawPauseMenu() {
    if(!gameIsPaused || !gameIsPausable) return;

    drawGui(() => {
        rectMode(CENTER)

        fill(0, 0.7)
        rect(0, 0, baseWidth, baseHeight)

        fill(1)
        rect(0, 0, baseWidth*0.6, baseHeight*0.6, 15)

        // fill(0)
        textAlign(CENTER, CENTER)
        textSize(50)
        text('Jogo pausado', 0, -280)

        for (let i = 0; i < pauseMenuButtons.length; i++) {
            const b = pauseMenuButtons[i];
            
            b.draw()
        }
    })
}