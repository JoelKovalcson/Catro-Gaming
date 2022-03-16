import React from 'react';
import Block from "./Block";

function Grid (props) {
	let grid = [];
	for(let c = 0; c < props.cols; c++) {
			grid.push([]);
			for (let r = 0; r < props.rows; r++) {
					grid[c].push(<Block key={`${props.name}-${c}-${r}`} classInfo={`${props.classInfo} ${(props?.gridInfo[c][r]) ? props.gridInfo[c][r] : 'bg-slate-500'}`}/>)
			}
	}
	
	grid = grid.map((col, i) => {
		return <div key={`${props.name}-${i}`}>{col}</div>;
	});


	return(
		<>
			<div className={`flex ${props?.gridPadding}`}>
				{grid}
			</div>
		</>
	)
};

export default Grid;