import React from 'react';
import Block from "./Block";

function Grid (props) {
    let grid = [];
    for(let c = 0; c < props.cols; c++) {
        grid.push([]);
        for (let r = 0; r < props.rows; r++) {
            grid[c].push(<Block key={`${props.name}-${r}-${c}`} blockInfo={props.blockInfo}/>)
        }
    }
		grid = grid.map((col) => {
			return <div>{col}</div>;
		});


    return(
        <>
        <div className='flex mr-1'>
            {grid}
        </div>
        </>
    )
};

export default Grid;