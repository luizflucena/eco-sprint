function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min)
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