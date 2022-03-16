import React, { useState } from "react";
// import apollo server

const LoginForm = () => {
    // initialize state for username and password
    // const [formState, setFormState] = useState({ username: '', password: ''});
    // initialize graphql mutation LOGIN
    // const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
			console.log('submit');
        event.preventDefault();
        // add try/catch to login.. if ok add jwt token
    };

    const handleChange = (event) => {
			console.log('Change');
        // const { name, value } = event.target;
        // setFormState({
        //     ...formState,
        //     [name]: value,
        // });
    };
  

    return(
        <form onSubmit={handleFormSubmit}>
            <div className="form-group mb-6">
            <label htmlFor="username" className="form-label inline-block mb-2 text-gray-700" >Username</label>
            <input type="username" onChange={handleChange} className="form-control
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
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="username"
                aria-describedby="emailHelp" placeholder="Enter username"/>
            </div>
            <div className="form-group mb-6">
            <label htmlFor="password" className="form-label inline-block mb-2 text-gray-700" >Password</label>
            <input type="password" onChange={handleChange} className="form-control block
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
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="password"
                placeholder="Password"/>
            </div>
                <button type="submit"  className="
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
                ease-in-out">Login</button>
                
            </form>
    )
};

export default LoginForm;