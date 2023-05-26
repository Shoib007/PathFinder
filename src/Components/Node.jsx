import React from 'react';
import "./Node.css";

export default function Node({isStart, isEnd, row, col, isWall}) {
    const classes = isStart ? "node-start" : isEnd ? "node-end" : isWall ? "isWall" :"";
  return (
    <div className={`node ${classes}`} id={`node-${row}-${col}`} >
        .
    </div>
  )
}
