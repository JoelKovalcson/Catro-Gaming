import React from "react";

const Upperscore = () => {
    return (
       <>
        <table className="table-fixed border border-light-blue">
            <thead>
                <tr>
                    <th className="border border-light-blue">Upper Section</th>
                    <th className="border border-light-blue">How to Score</th>
                    <th className="border border-light-blue">Player</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-light-blue">Aces</td>
                    <td className="border border-light-blue">Count and add only your ones</td>
                    <td className="border border-light-blue">1</td>
                </tr>
                <tr>
                    <td className="border border-light-blue">Twos</td>
                    <td className="border border-light-blue">Count and add only your twos</td>
                    <td className="border border-light-blue">2</td>
                </tr>
                <tr>
                    <td className="border border-light-blue">Threes</td>
                    <td className="border border-light-blue">Count and add only your threes</td>
                    <td className="border border-light-blue">3</td>
                </tr>
                <tr>
                    <td className="border border-light-blue">Fours</td>
                    <td className="border border-light-blue">Count and add only your fours</td>
                    <td className="border border-light-blue">4</td>
                </tr>
                <tr>
                    <td className="border border-light-blue">Fives</td>
                    <td className="border border-light-blue">Count and add only your fives</td>
                    <td className="border border-light-blue">5</td>
                </tr>
                <tr>
                    <td className="border border-light-blue">Sixes</td>
                    <td className="border border-light-blue">Count and add only your sixes</td>
                    <td className="border border-light-blue">6</td>
                </tr>
                <tr>
                    <td className="border border-light-blue">Total</td>
                    <td className="border border-light-blue">⇨</td>
                    <td className="border border-light-blue">Your total</td>
                </tr>
                <tr>
                    <td className="border border-light-blue">Bonus</td>
                    <td className="border border-light-blue">If total is over 63 add 35 points to your total score</td>
                    <td className="border border-light-blue">Your total</td>
                </tr>
                <tr>
                    <td className="border border-light-blue">Upper Total</td>
                    <td className="border border-light-blue">⇨</td>
                    <td className="border border-light-blue">Your total</td>
                </tr>
            </tbody>
        </table>
       </> 
    )
}

export default Upperscore