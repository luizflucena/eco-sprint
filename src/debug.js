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

    avgOverTime(value, frameInterval, identifier) {
        if(!this.hasOwnProperty(identifier)) {
            this[identifier] = { sum: 0, result: 0 }
        }

        const obj = this[identifier]

        obj.sum += value === Infinity ? 0 : value

        if(frameCount % frameInterval === 0) {
            obj.result = obj.sum / frameInterval
            obj.sum = 0
        }

        return obj.result
    }
}

var debug