import { dependencies, peerDependencies } from '../package.json';

import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs';
import { createFilter } from 'rollup-pluginutils';
import includePaths from 'rollup-plugin-includepaths';
import json from '@rollup/plugin-json';
import nodeGlobals from 'rollup-plugin-node-globals';
import resolve from '@rollup/plugin-node-resolve';

const external = createFilter(
    Object.keys({...dependencies, ...peerDependencies}).map(item => item),
    null,
    { resolve: false }
);

const extensions = [ '.js' ];

export default {
    input: './src/index.js',
    output: {
        file: './index.js',
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
        }),
    ]
}
