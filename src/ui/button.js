var _buttonMode = 'corner'
function buttonMode(mode) {
    _buttonMode = mode
}

function setupButtonListeners() {
    canvas.elt.addEventListener('click', () => {
        for (let i = 0; i < allButtons.length; ++i) {
            const button = allButtons[i]
            
            if(button.enabled && button.mouseOver()) {
                button.onClick()

                break;
            }
        }
    })
}

var allButtons = []
class Button {
    constructor(text = '', x = 0, y = 0, width = 300, height = 100, functions = {}) {
        if(_buttonMode === 'center') {
            x -= width/2
            y -= height/2
        }

        // canvas.elt.addEventListener('click', () => {
        //     if(this.enabled && this.mouseOver())
        //         this.onClick()
        // })

        this.enabled = false

        this.position = Vector2.create(x, y)
        this.size = Vector2.create(width, height)
        this.borderRadius = 0

        this.onClick = () => { if(functions.onClick) functions.onClick(this) }
        this.mouseIsPressed = () => { if(functions.mouseIsPressed) functions.mouseIsPressed(this) }
        this.onHover = () => { if(functions.onHover) functions.onHover(this) }
        this.onNotHover = () => { if(functions.onNotHover) functions.onNotHover(this) }

        this.text = {
            text: text,
            font: fonts.extrabold,
            size: 60,
            color: [0],
            offsetX: 0,
            offsetY: 0
        }

        this.hitbox = new Hitbox(x, y, x + width, y + height)

        allButtons.push(this)
    }

    mouseOver() {
        return this.hitbox.testCollisionPoint(guiMouseX, guiMouseY).hasHit
    }

    draw() {
        if(!this.enabled) return;

        if(this.mouseOver()) {
            this.onHover()

            if(mouseIsPressed) this.mouseIsPressed()
        }
        else {
            this.onNotHover()
        }

        push()

        rect(this.position.x, this.position.y, this.size.x, this.size.y,
            this.borderRadius, this.borderRadius, this.borderRadius, this.borderRadius)

        rectMode(CORNER)
        textAlign(CENTER, CENTER)
        textFont(this.text.font)
        textSize(this.text.size)
        fill(...this.text.color)

        text(this.text.text, this.position.x + this.text.offsetX, this.position.y + this.text.offsetY, this.size.x, this.size.y)

        pop()

        // this.hitbox.draw()
    }
}