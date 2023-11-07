var _buttonMode = 'corner'
function buttonMode(mode) {
    _buttonMode = mode
}

class Button {
    constructor(text = '', x = 0, y = 0, width = 300, height = 100, functions = {}) {
        if(_buttonMode === 'center') {
            x -= width/2
            y -= height/2
        }

        canvas.elt.addEventListener('click', () => {
            if(this.enabled && this.mouseOver())
                this.onClick()
        })

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
            size: 60,
            color: [0],
            offsetX: 0,
            offsetY: 0
        }

        this.hitbox = new Hitbox(x, y, x + width, y + height)
    }

    mouseOver() {
        return this.hitbox.testCollisionPoint(mouseX - width/2, mouseY - height/2).hasHit
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

        rect(this.position.x, this.position.y, this.size.x, this.size.y,
            this.borderRadius, this.borderRadius, this.borderRadius, this.borderRadius)

        push()

        rectMode(CORNER)
        textFont(fonts.extrabold)
        textAlign(CENTER, CENTER)
        textSize(this.text.size)
        fill(...this.text.color)

        text(this.text.text, this.position.x + this.text.offsetX, this.position.y + this.text.offsetY, this.size.x, this.size.y)

        pop()

        
        // this.hitbox.draw()
    }
}