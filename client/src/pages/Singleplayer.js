import React from "react";
import { Link } from "react-router-dom";

const Singleplayer = () => {

    return (
        <>
        <div className="flex flex-wrap justify-center w-screen">
            <Link to='/tetris' className="card-image flex flex-col justify-center mx-4 mt-4 h-48 w-48 rounded bg-cover bg-center bg-tetris">    
                <div className="card-text self-center text-dark-blue brightness-150 text-2xl">Tetris</div>
            </Link>

            <Link to='/singleplayer' className="card-image flex flex-col justify-center mx-4 mt-4 h-48 w-48 rounded bg-cover bg-center bg-chuck-norris">    
                <div className="card-text text-center text-2xl">More Coming Soon</div>
            </Link>
        </div>
        </>
    )
}

export default Singleplayer;