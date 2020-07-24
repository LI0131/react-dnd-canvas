import json from '@rollup/plugin-json';

const plugins = [
    json()
]

export default {
    input: './src/index.js',
    output: {
        file: './dist/index.js',
        format: 'umd',
        name: 'react-dnd-canvas'
    },
    plugins
}
