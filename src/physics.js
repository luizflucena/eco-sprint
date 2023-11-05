// @ts-nocheck
const defaultGravity = 9.8

var scenePhysicsObjects = []
class PhysicsObject {
    constructor() {
        this.enabled = true
        this.dynamic = false

        this.hitbox = new Hitbox()
        this.gravity = defaultGravity
        this.friction = 0.25

        this.velocity = Vector2.zero

        scenePhysicsObjects.push(this)
    }

    applyForce(x, y) {
        this.velocity.x += x
        this.velocity.y += y
    }

    updatePosition(objPosition) {
        if(!this.enabled || !this.dynamic) return

        this.velocity.y -= this.gravity * fpsAdjustment

        // Testar colisões com todas as hitbox da cena
        for(let i = 0; i < scenePhysicsObjects.length; ++i) {
            const obj = scenePhysicsObjects[i]
            if(obj === this || !obj.enabled) continue;

            const hit = this.hitbox.testCollisionAABB(obj, this.velocity)
            if(hit.hasHit) {
                this.velocity.sub(hit.overshoot)

                const friction = Math.min(this.friction, obj.friction)
                const gravityFrictionWeight = hit.normal.dot(0, Math.sign(this.gravity))
                if(Math.abs(this.velocity.x) > 1e-2)
                    this.velocity.x -= Math.sign(this.velocity.x) * gravityFrictionWeight * Math.min(friction, Math.abs(this.velocity.x))
            }
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
    // O parâmetro offset projeta a posição do objeto para calcularmos uma colisão
    // que ainda não aconteceu. Pode ser um vetor velocidade, por exemplo
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
            hit.normal.set(-Math.sign(hit.overshoot.x), 0)
        } else {
            hit.overshoot.x = 0
            hit.normal.set(0, -Math.sign(hit.overshoot.y))
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