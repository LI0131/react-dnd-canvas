import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodeGlobals from 'rollup-plugin-node-globals';
import includePaths from 'rollup-plugin-includepaths';
import { createFilter } from 'rollup-pluginutils';
import { dependencies, peerDependencies } from '../package.json';

const external = createFilter(
    Object.keys({...dependencies, ...peerDependencies}).map(item => item),
    null,
    { resolve: false }
);

const extensions = [ '.js' ];

export default {
    input: './src/index.js',
    output: {
        file: './dist/index.js',
        format: 'esm',
        name: 'react-dnd-canvas'
    },
    external,
    plugins: [
        babel({
            exclude: 'node_modules/**',
            extensions,
            configFile: './babel.config'
        }),
        resolve({
            browser: true
        }),
        nodeGlobals(),
        json(),
        commonjs(),
        includePaths({
            include: {},
            paths: ['./src'],
            external: [],
            extensions: ['.js']
        })
    ]
}
