import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { itemTypes } from '../types';
import { setMovingComponent } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

const MoveableComponent = ({
    children,
    id,
    x,
    y,
    showDragFootprint,
    dragProps,
    moveableStyle,
    addDimensions
}) => {
    const dispatch = useDispatch();
    const componentRef = useRef();
    const [{ isDragging }, drag] = useDrag({
        item: { type: itemTypes.MOVEABLE },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        ...dragProps
    });

    useEffect(() => {
        isDragging && dispatch(setMovingComponent(id));
    }, [isDragging, setMovingComponent, id]);

    useEffect(() => {
        componentRef.current && addDimensions(id, componentRef.current.getBoundingClientRect(), x, y);
    }, [x, y]);

    return <div
        key={ id }
        ref={ drag }
        style={{ ...moveableStyle,
            opacity: showDragFootprint && isDragging ? 0.5 : 1,
            position: 'absolute',
            cursor: 'move',
            top: y,
            left: x
        }}
    >
        <div ref={ componentRef }>
            { React.cloneElement(children, { id, x, y }) }
        </div>
    </div>;
};

MoveableComponent.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    addDimensions: PropTypes.func,
    showDragFootprint: PropTypes.bool,
    removeComponent: PropTypes.func,
    dragProps: PropTypes.shape({
        [PropTypes.string]: PropTypes.any
    }),
    moveableStyle: PropTypes.shape({
        [PropTypes.string]: PropTypes.any
    })
};

MoveableComponent.defaultProps = {
    x: 0,
    y: 0,
    showDragFootprint: true
};

export default MoveableComponent;
