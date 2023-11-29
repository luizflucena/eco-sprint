const allLevels = []
// Apenas para a lógica de cada nível, o conteúdo está em scenes.js
class Level {
    constructor(requiredTrash = 1) {
        this.requiredTrash = requiredTrash
        this.isComplete = false
        this.isLocked = true

        allLevels.push(this)
    }

    complete() {
        this.isComplete = true
        setCurrentScene(scenes.levelSelect)
    }

    unlock() {
        this.isLocked = false
    }
}