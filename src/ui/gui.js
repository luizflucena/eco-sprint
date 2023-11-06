// @ts-nocheck
var guiBuffer
function setupGui() {
    guiBuffer = createFramebuffer( { format: FLOAT } )
}

// Utilizar após todo o resto ter sido renderizado
function drawGui(content = () => {}) {
    guiBuffer.draw(clear)
    guiBuffer.draw(content)

    push()

    shaders.screen.setUniform('uScreenBuffer', guiBuffer)
    shader(shaders.screen)
    square(0, 0, 100)
    
    pop()
}
