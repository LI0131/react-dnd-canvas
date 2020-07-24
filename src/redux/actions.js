import * as ActionTypes from './action-types';

export const addComponent = (x, y, registeryType) => {
    return {
        type: ActionTypes.ADD_COMPONENT,
        payload: { x, y, type: registeryType }
    };
};

export const updateComponent = (id, x, y) => {
    return {
        type: ActionTypes.UPDATE_COMPONENT,
        payload: { id, x, y }
    }
};

export const setMovingComponent = (id) => {
    return {
        type: ActionTypes.SET_MOVING_COMPONENT,
        payload: id
    }
};