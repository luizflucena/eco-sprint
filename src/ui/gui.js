// @ts-nocheck
var guiBuffer
function setupGui() {
    guiBuffer = createFramebuffer( { format: FLOAT } )
}

// Executa a função especificada no buffer da GUI e, em seguida, desenha
// a GUI na tela, sobre todos os outros elementos. Utilizar só após todo o
// resto já ter sido desenhado
function drawGui(content = () => {}) {
    guiBuffer.draw(clear)
    guiBuffer.draw(content)

    push()

    shaders.screen.setUniform('uScreenBuffer', guiBuffer)
    shader(shaders.screen)
    square(0, 0, 100)
    
    pop()
}
