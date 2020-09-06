import { useState, useEffect } from 'react';
import { addComponent } from './redux'
import { useDispatch, useSelector } from 'react-redux';

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

export const useComponentsFromObject = object => {
    const [data, setData] = useState(object);
    const components = useSelector(state => state.CanvasReducer.components);
    const dispatch = useDispatch();

    const loadData = dispatch => {
        Object.values(data).map(obj => {
            const { x, y, type } = obj;
            try {
                setTimeout(() => dispatch(addComponent(x, y, type)), 100);
            } catch (error) {
                console.error(`Failed to load components: ${error}`)
            }
        });
    };

    useEffect(() => setData(components), [components]);

    useEffect(() => loadData(dispatch), []);

    return Object.assign({}, data);
};
