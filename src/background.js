class ParallaxBackground {
    constructor(parallaxLayers = [], parallaxSpeed = [1, 1]) {
        this.parallaxLayers = parallaxLayers
        this.parallaxSpeed = parallaxSpeed
    }

    draw() {
        if(this.parallaxLayers.length === 0) return;

        push()

        shader(shaders.parallax)
        shaders.parallax.setUniform('uRes', [this.parallaxLayers[0].width, this.parallaxLayers[0].height])
        shaders.parallax.setUniform('uPlayerPos', [player.position.x, player.position.y])
        shaders.parallax.setUniform('uParallaxSpeed', this.parallaxSpeed)
        for(let i = 0; i < this.parallaxLayers.length; ++i)
            shaders.parallax.setUniform('uLayer' + i, this.parallaxLayers[i])

        square(0, 0, 400)

        pop()
    }
}