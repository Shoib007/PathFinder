import React from 'react'
import '../App.css';
import {useXarrow} from 'react-xarrows';
import Draggable from 'react-draggable';

export default function DraggableBox({id}) {
    const updataXArrow = useXarrow();
  return (
    <Draggable onDrag={updataXArrow} onStop={updataXArrow}>
        <div id={id} className='box'>
            {id}
        </div>
    </Draggable>
  )
}
