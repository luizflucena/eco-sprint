// Apenas para a lógica de cada nível, o conteúdo está em scenes.js
class Level {
    constructor(requiredTrash = 1) {
        this.requiredTrash = requiredTrash
        this.completed = false
    }

    complete(trashCount) {
        if(trashCount >= this.requiredTrash) {
            debug.log('Nível completo')
            player.lockControls()
            this.completed = true
        } else {
            debug.log('Você ainda precisa de mais lixo')
        }
    }
}