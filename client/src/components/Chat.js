import React from "react";

const Chat = () => {
    return(
        <>
            <div className="border-b-4 border-double border-light-blue rounded">
                <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                    <li className="m-1" role="presentation">
                        <button className="py-4 px-4 text-sm font-medium text-center rounded hover:bg-dark-blue" id="world-tab" data-tabs-target="#world" type="button" role="tab" aria-controls="world" aria-selected="true">World</button>
                    </li>
                    <li className="m-1" role="presentation">
                        <button className="py-4 px-4 text-sm font-medium text-center rounded hover:bg-dark-blue" id="chat1-tab" data-tabs-target="#chat1" type="button" role="tab" aria-controls="chat1" aria-selected="true">Joel</button>
                    </li>
                    <li className="m-1" role="presentation">
                        <button className="py-4 px-4 text-sm font-medium text-center rounded hover:bg-dark-blue" id="chat2-tab" data-tabs-target="#chat2" type="button" role="tab" aria-controls="chat2" aria-selected="true">John</button>
                    </li>
                    <li className="m-1" role="presentation">
                        <button className="py-4 px-4 text-sm font-medium text-center rounded hover:bg-dark-blue" id="chat3-tab" data-tabs-target="#chat3" type="button" role="tab" aria-controls="chat3" aria-selected="true">Eric</button>
                    </li>
                    <li className="m-1" role="presentation">
                        <button className="py-4 px-4 text-sm font-medium text-center rounded hover:bg-dark-blue" id="chat4-tab" data-tabs-target="#chat4" type="button" role="tab" aria-controls="chat4" aria-selected="true">Josh</button>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col">
                <div className="p-2" id="myTabContent">
                    <div className="flex flex-col" id="world" role="tabpanel" aria-labelledby="world-tab">
                        <p className="m-1 p-2 bg-dark-blue rounded-xl w-1/2 text-sm text-center">Style for incoming</p>
                        <p className="self-end m-1 p-2 bg-pastel-green rounded-xl w-1/2 text-dark-blue text-sm text-center">Style for outgoing</p>
                    </div>
                </div>
                <div className="p-2">
                    <input className="p-2 w-full text-gray-900 bg-gray-50 rounded-xl"></input>
                </div>    
            </div>   
        </>
    )
}

export default Chat;