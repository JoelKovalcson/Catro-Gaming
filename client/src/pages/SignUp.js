import React, { useState } from "react";
//import SignUpForm from "../components/SignUpForm";
//import LoginForm from "../components/LoginForm";

const SignUp = () => {
  
	const [formState, setFormState] = useState({formType: 'signup', username: '', password: '', confirmPassword: '', error: ''})
	
	const changeForm = (event) => {
		if(event.target.id === 'tabs-signup-tab') {
			setFormState(prevState => {
				return {formType: 'signup', username: '', password: '', confirmPassword: '', error: ''}
			});
		}
		else if (event.target.id === 'tabs-login-tab') {
			setFormState( prevState => {
				return {formType: 'login', username: '', password: '', confirmPassword: '', error: ''}
			});
		}
	}

	const handleChange = () => {
		
		
	}

	const handleFormSubmit = (event) => {
		event.preventDefault();
		
	}

	return ( 
		<div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
			<ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
				role="tablist">
				<li className="nav-item" role="presentation">
					<button href="#tabs-signup" className="
						nav-link
						block
						font-medium
						text-xs
						leading-tight
						uppercase
						border-x-0 border-t-0 border-b-2 border-transparent
						px-6
						py-3
						my-2
						hover:border-transparent hover:bg-gray-100
						focus:border-transparent
						active
						" id="tabs-signup-tab" data-bs-toggle="pill" data-bs-target="#tabs-signup" role="tab" aria-controls="tabs-signup"
						aria-selected="true" onClick={changeForm}>
							Sign Up
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button href="#tabs-login" className="
						nav-link
						block
						font-medium
						text-xs
						leading-tight
						uppercase
						border-x-0 border-t-0 border-b-2 border-transparent
						px-6
						py-3
						my-2
						hover:border-transparent hover:bg-gray-100
						focus:border-transparent
						active
						" id="tabs-login-tab" data-bs-toggle="pill" data-bs-target="#tabs-login" role="tab" aria-controls="tabs-login"
						aria-selected="false" onClick={changeForm}>
							Login
					</button>
				</li>
			</ul>
			<div>
				<form onSubmit={handleFormSubmit}>
					<div className="form-group mb-6">
						<label htmlFor="username" className="form-label inline-block mb-2 text-gray-700" >
							Username
						</label>
						<input type="username" onChange={handleChange} value={formState.username} className="form-control
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
						<label htmlFor="password" className="form-label inline-block mb-2 text-gray-700" >
							Password
						</label>
						<input type="password" onChange={handleChange} value={formState.password} className="form-control block
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
					{ /*Check if signup is checked*/ (formState.formType === 'signup') && (<div className="form-group mb-6">
            <label htmlFor="confirmPassword" className="form-label inline-block mb-2 text-gray-700">
							Confirm Password
						</label>
            <input type="password" onChange={handleChange} value={formState.confirmPassword} className="form-control block
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
          </div>)}
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
						ease-in-out">
							Login
					</button>
					<div>
						{formState.error}
					</div>
				</form>
			</div>
		</div>
	)
};

export default SignUp;