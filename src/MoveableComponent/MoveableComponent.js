import * as ReduxActions from '../redux/actions';

import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { itemTypes } from '../types';

const MoveableComponent = ({ children, id, x, y, setMovingComponent }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: itemTypes.MOVEABLE },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
    });

    useEffect(() => {
        isDragging && setMovingComponent(id)
    }, [isDragging, setMovingComponent, id]);

    return <div
        key={ id }
        ref={ drag }
        style={{
            position: 'absolute',
            cursor: 'move',
            top: y,
            left: x
        }}
    >
        { children }
    </div>;
}

MoveableComponent.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    setMovingComponent: PropTypes.func
};

MoveableComponent.defaultProps = {
    x: 0,
    y: 0
};

export default connect(
    undefined,
    dispatch => ({ setMovingComponent: (id) => dispatch(ReduxActions.setMovingComponent(id)) })
)(MoveableComponent);
