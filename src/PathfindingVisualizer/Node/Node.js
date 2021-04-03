import React, { useState } from 'react'
import "./Node.css"
function Node({ side,
    leftmost,
    top,
    visited,
    wall,
    onMouseDown,
    onMouseUp,
    onMouseOver,
    onMouseOut,
    rowindex,
    columnindex,
    start,
    target,
}) {

    return (



        <div id={`${rowindex}-${columnindex}`} onContextMenu = {(e)=>{e.preventDefault();return false;}}
            className={`Node ${leftmost ? "leftmost" : ""} ${visited ? "visited" : ""} ${top ? "top" : ""} ${start ? "start" : ""} ${target ? "target" : ""}`}
            draggable = {false}
            onDragStart = {()=> {return false} }  onDrop = {()=> {return false} }
            style={{ height: `${side}px`, width: `${side}px` }}
            onMouseDown={(e)=>{ e.preventDefault();onMouseDown(rowindex, columnindex)}} 
            onMouseUp={()=>{onMouseUp(rowindex,columnindex)}}
            onMouseEnter={() => onMouseOver(rowindex, columnindex)}
            onMouseLeave = {()=>onMouseOut(rowindex,columnindex)}
        />
    )
}

export default Node;
