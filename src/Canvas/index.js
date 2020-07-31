import CanvasComponent from './Canvas';
import { DndProvider } from 'react-dnd';
import MouseBackEnd from 'react-dnd-mouse-backend';
import React from 'react';

export const Canvas = (props) => {
    return <DndProvider backend={ MouseBackEnd }>
        <CanvasComponent { ...props }/>
    </DndProvider>
}
