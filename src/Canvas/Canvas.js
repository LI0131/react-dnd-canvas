import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MoveableComponent } from '../MoveableComponent';
import PropTypes from 'prop-types';
import { itemTypes } from '../types';
import { updateComponent } from '../redux/actions';
import { useDimensions } from '../utils';
import { useDrop } from 'react-dnd';

const Canvas = ({
    style,
    height,
    width,
    registry,
    dropProps,
    dragProps,
    moveableStyle,
    showDragFootprint
}) => {
    const dispatch = useDispatch();
    const components = useSelector(state => state.CanvasReducer.components);
    const movingComponent = useSelector(state => state.CanvasReducer.movingComponent);
    const [canvasRect, setCanvasRect] = useState();
    const [clientPos, setClientPos] = useState();
    const [dimensions, { addDimensions }] = useDimensions();
    const canvasRef = useRef();
    const [,drop] = useDrop({
        accept: itemTypes.MOVEABLE,
        canDrop: () => {
            const { x, y, height, width } = canvasRect;
            const checkDims = (canX, canY, canHeight, canWidth) => {
                const { height, width } = dimensions[movingComponent].rect;
                const { x, y } = clientPos;
                return ((x + width) <= (canX + canWidth) && (y + height) <= (canY + canHeight) && x > canX && y > canY);
            };
            return movingComponent && canvasRect && clientPos ? checkDims(x, y, height, width) : false;
        },
        drop: () => clientPos && movingComponent && dispatch(
            updateComponent(movingComponent, clientPos.x, clientPos.y)),
        collect: monitor => ({
            currentOffset: setClientPos(
                monitor.getSourceClientOffset()
            )
        }),
        ...dropProps
    });

    useEffect(() => {
        canvasRef.current && setCanvasRect(canvasRef.current.getBoundingClientRect())
    }, [drop, setCanvasRect]);

    return <div ref={ canvasRef } style={{ width, height, ...style }}>
        <div ref={ drop } style={{ height: 'inherit', width: 'inherit' }}>
            {components.map(({ id, x, y, type }) => {
                const { component: Component, props } = registry?.[type];
                return <React.Fragment>
                    {Component && <MoveableComponent
                        key={ id }
                        id={ id }
                        x={ x }
                        y={ y }
                        dragProps={ dragProps }
                        moveableStyle={ moveableStyle }
                        showDragFootprint={ showDragFootprint }
                        addDimensions={ addDimensions }
                    >
                        <Component {...props}/>
                    </MoveableComponent>}
                </React.Fragment>
            })}
        </div>
    </div>;
};

Canvas.propTypes = {
    style: PropTypes.shape({
        [PropTypes.string]: PropTypes.any
    }),
    height: PropTypes.number,
    width: PropTypes.number,
    registry: PropTypes.object.isRequired,
    DeletionComponent: PropTypes.node,
    dropProps: PropTypes.shape({
        [PropTypes.string]: PropTypes.any
    }),
    dragProps: PropTypes.shape({
        [PropTypes.string]: PropTypes.any
    }),
    showDragFootprint: PropTypes.bool
};

Canvas.defaultProps = {
    height: 800,
    width: 400
};

export default Canvas;
