import React from 'react';
import { DndProvider } from 'react-dnd';
import MouseBackEnd from 'react-dnd-mouse-backend';

import CanvasComponent from './Canvas';

export const Canvas = (props) => {
    return <DndProvider backend={ MouseBackEnd }>
        <CanvasComponent { ...props }/>
    </DndProvider>
}