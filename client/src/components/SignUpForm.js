import React from "react";

const SignUpForm = () => {
    return(
        <form>
            <div className="form-group mb-6">
            <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700">Username</label>
            <input type="username" className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2"
                aria-describedby="emailHelp" placeholder="Enter username"/>
            </div>
            <div className="form-group mb-6">
            <label htmlFor="Password" className="form-label inline-block mb-2 text-gray-700">Password</label>
            <input type="password" className="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="Password"
                placeholder="Password"/>
            </div>
            <div className="form-group mb-6">
            <label htmlFor="confirmPassword" className="form-label inline-block mb-2 text-gray-700">Confirm Password</label>
            <input type="password" className="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="confirmPassword"
                placeholder="Confirm Password"/>
            </div>
                <button type="submit" className="
                w-full
                px-6
                py-2.5
                bg-blue-600
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out">Sign in</button>
            </form>
    )
};

export default SignUpForm;