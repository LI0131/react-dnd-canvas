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

In conjunction with the component registry, state is also managed within the redux store. After registering a component, there needs to be a way to add a component into the redux store within your App. To add components to the store utilize the `addComponent` redux action.

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
