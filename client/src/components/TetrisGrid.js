import TetrisBlock from "./TetrisBlock"

function TetrisGrid() {
    let rows = 3
    let cols = 3
    const grid =[]
    for(let r = 0; r < rows; r ++) {
        grid.push([])
        for (let c = 0; c < cols; c ++) {
            grid[r].push(<TetrisBlock key={`${cols}${rows}`}/>)
        }
    }

    return(
        <>
        <div>
            {grid}
        </div>
        </>
    )
};

export default TetrisGrid