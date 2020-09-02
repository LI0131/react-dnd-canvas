import * as ActionTypes from './action-types';

const initialState = {
    components: [],
    movingComponent: undefined
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMPONENT: 
            return {
                ...state,
                components: [ ...state.components, {
                    id: `component-${(new Date()).toISOString()}`,
                    ...action.payload
                }]
            }
        case ActionTypes.REMOVE_COMPONENT:
            return {
                ...state,
                components: state.components.filter(component => component.id !== action.payload)
            }
        case ActionTypes.UPDATE_COMPONENT:
            return {
                ...state,
                components: state.components.map(component => {
                    return component.id === action.payload.id ? { ...action.payload, type: component.type } : component;
                })
            };
        case ActionTypes.SET_MOVING_COMPONENT:
            return {
                ...state,
                movingComponent: action.payload
            }
        default:
            return state;
    };
};

export default reducer;
