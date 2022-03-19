import React from "react";

const Upperscore = () => {
    return (
       <>
        <table className="table-fixed rounded border border-light-blue m-4 text-center border-separate">
            <thead>
                <tr>
                    <th className="rounded border border-light-blue p-1">Upper Section</th>
                    <th className="rounded border border-light-blue p-1">Player</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="rounded border border-light-blue">Aces</td>
                    <td className="rounded border border-light-blue">1</td>
                </tr>
                <tr>
                    <td className="rounded border border-light-blue">Twos</td>
                    <td className="rounded border border-light-blue">2</td>
                </tr>
                <tr>
                    <td className="rounded border border-light-blue">Threes</td>
                    <td className="rounded border border-light-blue">3</td>
                </tr>
                <tr>
                    <td className="rounded border border-light-blue">Fours</td>
                    <td className="rounded border border-light-blue">4</td>
                </tr>
                <tr>
                    <td className="rounded border border-light-blue">Fives</td>
                    <td className="rounded border border-light-blue">5</td>
                </tr>
                <tr>
                    <td className="rounded border border-light-blue">Sixes</td>
                    <td className="rounded border border-light-blue">6</td>
                </tr>
                <tr>
                    <td className="rounded border border-light-blue">Total</td>
                    <td className="rounded border border-light-blue">Your total</td>
                </tr>
                <tr>
                    <td className="rounded border border-light-blue">Bonus</td>
                    <td className="rounded border border-light-blue">Your total</td>
                </tr>
                <tr>
                    <td className="rounded border border-light-blue">Upper Total</td>
                    <td className="rounded border border-light-blue">Your total</td>
                </tr>
            </tbody>
        </table>
       </> 
    )
}

export default Upperscore