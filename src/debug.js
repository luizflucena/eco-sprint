/* ------------------------- FERRAMENTAS PARA DEBUG ------------------------- */

class DebugConsole {
    constructor() {
        this.debugContainer = createDiv('');
        this.debugContainer.parent(select('main'))
        this.debugContainer.addClass('debug-container')
        this.debugContainer.attribute('style', 'width:' + width + 'px')

        this.debugGaugesContainer = createDiv('')
        this.debugGaugesContainer.parent(this.debugContainer)
        this.debugGaugesContainer.addClass('debug-gauges')
        this.debugGauges = []

        this.consoleElement = createDiv();
        this.consoleElement.parent(this.debugContainer)
        this.consoleElement.addClass('debug-console')
    }

    log(message) {
        this.consoleElement.html(message + '<br>', true)
    }

    addGauge(label, initialValue) {
        if(initialValue === undefined)
            initialValue = ""

        let gauge = createDiv(label + ':<br>' + initialValue)
        gauge.parent(this.debugGaugesContainer)
        gauge.id(label + '-gauge')
        this.debugGauges.push(gauge)
    }

    updateGauge(label, value) {
        let gauge = this.debugGauges.find(obj => obj.id().slice(0, -6) === label)

        if(gauge === undefined)
            return

        gauge.html(label + ':<br>' + value)
    }
}

var debug

var fpsSum = 0, fps = 0
function avgFPS(frameInterval) {
    fpsSum += frameRate() === Infinity ? 0 : frameRate()

    if(frameCount % frameInterval === 0) {
        fps = fpsSum / frameInterval
        fpsSum = 0
    }

    return fps
}