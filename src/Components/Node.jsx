// import React, { useState } from 'react';
import "./Node.css";
// let mouseDown = false;
export default function Node({isStart, isEnd, row, col, isWall}) {
  
  // const [isWall, setisWall] = useState(false);
  // const mousedown = () => {
  //   mouseDown = true;
  //   setisWall(true);
  //   console.log("Mouse Down");
  // }
  // const mouseMove = () => {
  //   if(mouseDown){
  //     setisWall(true);
  //     console.log("Mouse Move");
  //   }
  // }
  
  // const mouseUp = () => {
  //   mouseDown = false;
  // }
  const classes = isStart ? "node-start" : isEnd ? "node-end" : isWall ? "isWall" :"";

  return (
    <div className={`node ${classes}`} id={`node-${row}-${col}`}>
        
    </div>
  )
}
