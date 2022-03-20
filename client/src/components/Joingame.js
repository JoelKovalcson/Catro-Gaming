import React from "react";

const Joingame = () => {
    return (
        <>
            <h3 className="self-center text-xl font-bold">Resume Game</h3>
            <ul>
                <li className="border-4 border-double border-pastel-purple m-4 p-2 rounded">
                    <div className="flex flex-col items-center">
                        <h4 className="text-lg font-semibold">Yahtzee</h4>
                        <h5>Host: Peter</h5>
                        <h5>Player: 2/2</h5>
                        <button className="rounded bg-pastel-purple hover:bg-opacity-80 text-dark-blue py-1 px-3 my-2 mx-1">Rejoin Game</button>
                    </div>
                </li>
                <li className="border-4 border-double border-pastel-purple m-4 p-2 rounded">
                    <div className="flex flex-col items-center">
                        <h4 className="text-lg font-semibold">Yahtzee</h4>
                        <h5>Host: Peter</h5>
                        <h5>Player: 2/2</h5>
                        <button className="rounded bg-pastel-purple hover:bg-opacity-80 text-dark-blue py-1 px-3 my-2 mx-1">Rejoin Game</button>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default Joingame;