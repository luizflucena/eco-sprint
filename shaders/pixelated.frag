#ifdef GL_ES
    precision mediump float;
#endif

void pixelateUV(inout vec2 uv, float res) {
    uv = (floor(uv*res) + 0.5)/res;
}

uniform sampler2D uTexture;

varying vec4 vPos;
varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;
    pixelateUV(uv, 16.0);

    gl_FragColor = texture2D(uTexture, uv);
}