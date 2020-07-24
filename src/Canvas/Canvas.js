import * as ReduxActions from '../redux/actions';

import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { itemTypes } from '../types';
import { MoveableComponent } from '../MoveableComponent';
import { useRegistry } from '../registry';

const Canvas = ({ height, width, components, movingComponent, updateComponent }) => {
    const [clientPos, setClientPos] = useState();
    const registry = useRegistry();
    const [,drop] = useDrop({
        accept: itemTypes.MOVEABLE,
        drop: () => clientPos && movingComponent && updateComponent(movingComponent, clientPos.x, clientPos.y),
        collect: monitor => ({
            currentOffset: setClientPos(
                monitor.getSourceClientOffset()
            )
        })
    });

    return <div ref={ drop } style={{ width, height }}>
        {components.map(({ id, x, y, type }) => {
            const Component = registry?.[type]
            return <MoveableComponent id={ id } x={ x } y={ y }>
                { Component && <Component/> }
            </MoveableComponent>
        })}
    </div>;

};

Canvas.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    components: PropTypes.array,
    movingComponent: PropTypes.string,
    updateComponent: PropTypes.func
};

Canvas.defaultProps = {
    height: 800,
    width: 400
};

export default connect(
    state => ({
        components: state.components,
        movingComponent: state.movingComponent
    }),
    dispatch => ({
        updateComponent: (id, x, y) => dispatch(ReduxActions.updateComponent(id, x, y))
    })
)(Canvas);