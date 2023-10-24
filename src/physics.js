// @ts-nocheck
const defaultGravity = 9.8

// Hitbox simples AABB
class Hitbox {
    // Dois pontos opostos da diagonal de um quadrado (min e max)
    constructor(minX = -50, minY = -50, maxX = 50, maxY = 50) {
        this.localMin = new p5.Vector(minX, minY)
        this.localMax = new p5.Vector(maxX, maxY)

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
    testCollisionAABB(otherHitbox, offset) {
        let colliderMin, colliderMax
        if(offset instanceof p5.Vector) {
            colliderMin = otherHitbox.min.copy().add(offset)
            colliderMax = otherHitbox.max.copy().add(offset)
        } else {
            colliderMin = otherHitbox.min
            colliderMax = otherHitbox.max
        }

        const hit = new HitInfo()

        hit.hasHit =
            this.max.x >= colliderMin.x &&
            this.min.x <= colliderMax.x &&
            this.max.y >= colliderMin.y &&
            this.min.y <= colliderMax.y

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
    constructor(
        hasHit = false, // Se está colidindo ou não no momento
        overshoot = Vector2.zero, // Quanto o objeto passou do ponto de colisão
        normal = Vector2.zero, // Vetor normal da superfície com a qual se colidiu
    ) {
        this.hasHit = hasHit
        this.overshoot = overshoot
        this.normal = normal
    }
}