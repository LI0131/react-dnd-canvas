import { useState } from 'react';

export const useRegistry = () => {

    const [registry, setRegistry] = useState({});

    const register = (component, key) => {
        setRegistry({...registry, [key]: component})
    };

    return [registry, register];
};

export const useDimensions = () => {
    const [dimensions, setDimensions] = useState({});

    const hasDimensions = (id) => {
        const hasDim = Object.entries(dimensions).filter(dim => dim.id === id);
        return hasDim.length > 0;
    }

    const addDimensions = (id, domRect, x, y) => {
        setDimensions({...dimensions, [id]: {rect: domRect, currX: x, currY: y}});
    };

    return [dimensions, { hasDimensions, addDimensions }];
};
