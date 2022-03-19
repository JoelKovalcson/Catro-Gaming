import { useEffect, useState } from "react";
import React from "react";
import Dice from "./Dice";

const Rolldice = (props) => {
    const [roll, setRoll] = useState(1);
	let counter = 0;

	useEffect(() => {
		const interval = setInterval(() => {
			counter += 1;
			if(counter >= 18){
				clearInterval(interval);
			}
			setRoll(Math.floor(Math.random()*5)+1);
		}, 100);
	}, [props.isIsolated]);

    return (
        <Dice roll={roll}/>
    )
}

export default Rolldice;