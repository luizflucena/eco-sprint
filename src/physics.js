// @ts-nocheck
const defaultGravity = 9.8

class PhysicsObject {
    constructor() {
        this.enabled = false

        this.hitbox = new Hitbox()
        this.gravity = defaultGravity
        this.friction = 0.25

        this.velocity = Vector2.zero
    }

    applyForce(x, y) {
        this.velocity.x += x
        this.velocity.y += y
    }

    updatePosition(objPosition) {
        if(!this.enabled) return

        this.velocity.y -= this.gravity * deltaTime * 1e-3

        const groundHit = this.hitbox.testCollisionAABB(levelGround, this.velocity)
        if(groundHit.hasHit) {
            this.velocity.sub(groundHit.overshoot)

            const friction = Math.min(this.friction, levelGround.friction)
            const gravityFrictionWeight = groundHit.normal.dot(0, 1)
            if(Math.abs(this.velocity.x) > 1e-2)
                this.velocity.x -= Math.sign(this.velocity.x) * gravityFrictionWeight * Math.min(friction, Math.abs(this.velocity.x))

            debug.updateGauge('free', this.velocity.x)
            
        }

        objPosition.add(this.velocity)
        this.hitbox.transformHitbox(objPosition, 1)
    }
}

// Hitbox simples AABB
class Hitbox {
    // Dois pontos opostos da diagonal de um quadrado (min e max)
    constructor(minX = -50, minY = -50, maxX = 50, maxY = 50) {
        this.localMin = new p5.Vector(minX, minY)
        this.localMax = new p5.Vector(maxX, maxY)

        this.min = this.localMin.copy()
        this.max = this.localMax.copy()
    }

    set(minX, minY, maxX, maxY) {
        this.localMin.set(minX, minY)
        this.localMax.set(maxX, maxY)

        this.min = this.localMin.copy()
        this.max = this.localMax.copy()
    }

    // Para manter a posição e o tamanho da hitbox proporcionais ao objeto
    transformHitbox(position, scale) {
        const min = this.localMin
        const max = this.localMax

        let transformMatrix = p5.Matrix.identity()
        transformMatrix.translate(position.array())
        if(typeof scale === 'number') {
            transformMatrix.scale(scale, scale, scale)
        } else {
            transformMatrix.scale(scale)
        }

        const minTransformedArray = transformMatrix.multiplyVec4(min.x, min.y, min.z, 1.)
        const maxTransformedArray = transformMatrix.multiplyVec4(max.x, max.y, max.z, 1.)

        this.min.set(minTransformedArray[0], minTransformedArray[1], 0.)
        this.max.set(maxTransformedArray[0], maxTransformedArray[1], 0.)
    }

    // Testar contato com outra hitbox AABB
    //
    // O parâmetro offset é útil para determinar uma colisão que ainda
    // não aconteceu (pode ser um vetor velocidade, por exemplo)
    testCollisionAABB(physicsObj, offset) {
        const otherHitbox = physicsObj.hitbox

        // Para utilizar o offset aqui, em vez de testarmos a colisão movendo esta
        // hitbox de acordo com o offset, movemos, na verdade, o hitbox do outro objeto
        // na direção oposta do offset. É assim porque eu me confundi
        let otherMin, otherMax
        if(offset instanceof p5.Vector) {
            otherMin = otherHitbox.min.copy().sub(offset.x, offset.y)
            otherMax = otherHitbox.max.copy().sub(offset.x, offset.y)
        } else {
            otherMin = otherHitbox.min
            otherMax = otherHitbox.max
        }

        const hit = new HitInfo()

        hit.hasHit =
            this.max.x >= otherMin.x &&
            this.min.x <= otherMax.x &&
            this.max.y >= otherMin.y &&
            this.min.y <= otherMax.y

        hit.overshoot.x = minAbs(this.max.x - otherMin.x, this.min.x - otherMax.x)
        hit.overshoot.y = minAbs(this.max.y - otherMin.y, this.min.y - otherMax.y)
        if(minAbs(hit.overshoot.x, hit.overshoot.y) === hit.overshoot.x) {
            hit.overshoot.y = 0
            hit.normal.x = -Math.sign(hit.overshoot.x)
        } else {
            hit.overshoot.x = 0
            hit.normal.y = -Math.sign(hit.overshoot.y)
        }

        return hit
    }

    // Representação visual da hitbox para debug
    draw() {
        const min = this.min
        const max = this.max

        push()
        resetMatrix()
        noFill()
        stroke(0, 1, 0)

        beginShape()

        vertex(min.x, min.y)
        vertex(min.x, max.y)
        vertex(max.x, max.y)
        vertex(max.x, min.y)

        endShape(CLOSE)

        pop()
    }
}

// Contém todas as informações necessárias a respeito de uma colisão
class HitInfo {
    constructor() {
        this.hasHit = false // Se está colidindo ou não no momento
        this.overshoot = Vector2.zero // Quanto o objeto atravessou a hitbox, ou passou do ponto de colisão
        this.normal = Vector2.zero // Vetor normal da superfície com a qual se colidiu
    }
}