// @ts-nocheck

class Vector2 {
    static create(x, y) {
        return new p5.Vector(x, y)
    }

    static get zero() { return new p5.Vector(0, 0) }
    static get one() { return new p5.Vector(1, 1) }
    static get right() { return new p5.Vector(1, 0) }

    static lerp(from, to, value) {
        from.x = from.x + (to.x - from.x) * value
        from.y = from.y + (to.y - from.y) * value

        return from
    }
}

function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min)
}

function map(value, min1, max1, min2, max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1)
}

// Retorna o número, ainda com o sinal, de menor módulo
function minAbs(a, b, c) {
    if(arguments.length === 2) {
        const x = Math.abs(a)
        const y = Math.abs(b)

        return Math.min(x, y) === x ? a : b
    }

    if(arguments.length === 3) {
        const x = Math.abs(a)
        const y = Math.abs(b)
        const z = Math.abs(c)

        const min = Math.min(x, y, z)

        if(min === x)
            return a
        else if(min === y)
            return b
        else
            return c
    }

    const abs = [...arguments]
    abs.forEach((n, i) => abs[i] = Math.abs(n))
    const i = abs.indexOf(Math.min(...abs))

    return arguments[i]
}