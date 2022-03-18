import React from 'react';
import Block from "./Block";

function Grid (props) {
	let grid = [];
	for(let r = 0; r < props.rows; r++) {
			grid.push([]);
			for (let c = 0; c < props.cols; c++) {
					grid[r].push(<Block key={`${props.name}-${r}-${c}`} classInfo={`${props.classInfo} ${(props?.gridInfo[r][c]) ? props.gridInfo[r][c] : 'bg-slate-500'}`}/>)
			}
	}
	
	grid = grid.map((row, i) => {
		return <div className="flex justify-center w-100" key={`${props.name}-${i}`}>{row}</div>;
	});


	return(
		<>
			<div className={`${(props.gridPadding)? props.gridPadding :''}`}>
				{grid}
			</div>
		</>
	)
};

export default Grid;