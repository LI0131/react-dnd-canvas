[![npm version](https://img.shields.io/npm/v/react-dnd-canvas.svg?style=flat-square)](https://www.npmjs.com/package/react-dnd-canvas)
[![npm downloads](https://img.shields.io/npm/dm/react-dnd-canvas.svg?style=flat-square)](https://www.npmjs.com/package/react-dnd-canvas)

# react-dnd-canvas #

This repo provides a wrapper for the react-dnd package. By importing the `Canvas` component, one can register components (any node), which can be dragged and dropped within the Canvas.

# Setup #

## App entry ##

This package is dependent on `react-redux`. In order to utiltize the `Canvas`, the component must be wrapped in a react-redux `Provider`.

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Canvas } from './Canvas';
import store from './store';


ReactDOM.render(
    <Provider store={store}>
        <Canvas/>
    </Provider>,
    document.getElementById('root')
);
```

## Registering Components ##

In order to add a component to the `Canvas`, employ the component registry by importing the `register` function.

```
const Test = () => <form>
    <h1>Hello</h1>
    <p>Enter your name:</p>
    <input
        type="text"
    />
</form>;

register('TEST', Test);
```

## Adding Components ##

In conjunction with the component registry, state is also managed within the redux store. After registering a component, there needs to be a way to add a component into the redux store within your App. To add components to the store utilize the `addComponent` redux action. (Note: this action will need to be dispatched using react-redux)

```
const Form = () => {

    const onClick = () => {
        addComponent(100, 100, 'TEST');
    }
    
    return <div>
        <button onClick={onClick}>
            Enter
        </button>
    </div>;
};
```

The above will add the `Test` component into the redux store. The `Canvas` can then match the components in the redux store to those registered in the registry.


## Creating the store ##

In order to use the redux reducer provided by this package, use the `combineReducers` function exported from `redux`.

```
import { combineReducers, compose, createStore } from 'redux';
import { CanvasReducer } from 'react-dnd-canvas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(combineReducers({CanvasReducer}), composeEnhancers());
```

*Note:* The CanvasReducer must be referred to as CanvasReducer in the new store or the Canvas element will not be able to retrieve the components correctly.
