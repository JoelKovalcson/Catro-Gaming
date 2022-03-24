import React, { useState } from "react";
//import SignUpForm from "../components/SignUpForm";
//import LoginForm from "../components/LoginForm";
import { useMutation } from '@apollo/client';
import { GQL_ADD_USER, GQL_LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignUp = () => {
  
	const [formState, setFormState] = useState({formType: 'signup', username: '', password: '', confirmPassword: '', error: ''});

    // ADD_USER mutation
    const [addUser, { error }] = useMutation(GQL_ADD_USER);
		// LOGIN_USER mutation
		const [login, { e }] = useMutation(GQL_LOGIN_USER);
	
    // check to see if sign up or login
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

	const handleChange = (event) => {
		const { name, value } = event.target;
        setFormState( prevState => {
            return {...prevState, [name]: value};
        })
		
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault();
        // client side validation
        if (formState.formType === 'signup' && !(formState.password === formState.confirmPassword)){
            setFormState( prevState => {
                return{ ...prevState, error: 'Password must match'}
                
            })
            return;
            
        }
        else if (!formState.username.length){
            setFormState( prevState => {
                return{ ...prevState, error: 'Username field cannot be empty'}
            })
            return;
        }
        else if (formState.password.length < 5){
            setFormState( prevState => {
                return{ ...prevState, error: 'Password must be at least 5 characters'}
            })
            return;
        } else {
            // if ok try to addUser
            console.log('add user init');
            // try to add user
						if (formState.formType === "signup") {
              try {
                const mutationResponse = await addUser({
                  variables: {
                    username: formState.username,
                    password: formState.password,
                  },
                });
                const token = mutationResponse.data.addUser.token;

                Auth.login(token);
              } catch (error) {
                console.log(error);
              }
            } else if (formState.formType === "login") {
							try {
								const mutationResponse = await login({
									variables: {
										username: formState.username,
										password: formState.password
									}
								})
								const token = mutationResponse.data.login.token;
								Auth.login(token)
							}catch (e) {
								console.log(e);
							}
						}
              //set error to empty
              setFormState((prevState) => {
                return { ...prevState, error: "" };
              });
        }
		
	}
	if(Auth.loggedIn()) {
		window.location.assign('/Homepage');
		return <></>
	}
	return ( 
		<div className="mx-auto p-6 rounded-lg bg-light-background max-w-sm border border-4 border-double border-pastel-purple">
			<ul className="nav nav-tabs flex justify-around flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
				role="tablist">
				<li className="nav-item" role="presentation">
					<button href="#tabs-signup" className="
						rounded
						font-medium
						text-xs
						text-light-blue
						uppercase
						border-x-0 border-t-0 border-b-2 border-light-blue
						px-6
						py-3
						my-2
						bg-background
						hover:border-light-blue hover:bg-dark-blue
						focus:border-light-blue
						active
						" id="tabs-signup-tab" data-bs-toggle="pill" data-bs-target="#tabs-signup" role="tab" aria-controls="tabs-signup"
						aria-selected="true" onClick={changeForm}>
							Sign Up
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button href="#tabs-login" className="
						rounded
						font-medium
						text-xs
						text-light-blue
						uppercase
						border-x-0 border-t-0 border-b-2 border-light-blue
						px-6
						py-3
						my-2
						bg-background
						hover:border-light-blue hover:bg-dark-blue
						focus:border-light-blue
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
						<label htmlFor="username" className="form-label inline-block mb-2 text-light-blue" >
							Username
						</label>
						<input name="username" type="username" onChange={handleChange} value={formState.username} className="form-control
							block
							w-full
							px-3
							py-1.5
							font-normal
							text-blue-500
							bg-light-background bg-clip-padding
							border border-solid border-light-blue
							rounded
							transition
							ease-in-out
							m-0
							focus:text-blue-500 focus:bg-light-background focus:border-light-blue focus:outline-none" id="username"
							aria-describedby="emailHelp" placeholder="Enter username"/>
					</div>
					<div className="form-group mb-6">
						<label htmlFor="password" className="form-label inline-block mb-2 text-light-blue" >
							Password
						</label>
						<input name="password" type="password" onChange={handleChange} value={formState.password} className="form-control block
								w-full
								px-3
								py-1.5
								text-base
								font-normal
								text-blue-500
								bg-light-background bg-clip-padding
								border border-solid border-light-blue
								rounded
								transition
								ease-in-out
								m-0
								focus:text-blue-500 focus:bg-light-background focus:border-light-blue focus:outline-none" id="password"
								placeholder="Password"/>
					</div>
					{ /*Check if signup is checked*/ (formState.formType === 'signup') && (<div className="form-group mb-6">
            <label htmlFor="confirmPassword" className="form-label inline-block mb-2 text-light-blue">
							Confirm Password
						</label>
            <input name="confirmPassword" type="password" onChange={handleChange} value={formState.confirmPassword} className="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-blue-500
                bg-light-background bg-clip-padding
                border border-solid border-light-blue
                rounded
                transition
                ease-in-out
                m-0
                focus:text-blue-500 focus:bg-light-background focus:border-light-blue focus:outline-none" id="confirmPassword"
                placeholder="Confirm Password"/>
          </div>)}
					<button type="submit"  className="
						w-full
						px-6
						py-2.5
						bg-light-background
						border-4
						border-double
						border-light-blue
						text-light-blue
						font-medium
						text-sm
						font-bold
						leading-tight
						uppercase
						rounded
						shadow-md
						hover:bg-dark-blue hover:shadow-lg
						focus:bg-dark-blue focus:shadow-lg focus:outline-none focus:ring-0
						active:bg-blue-800 active:shadow-lg
						transition
						duration-150
						ease-in-out">
							Login
					</button>
					<div>
						{formState.error}
                        {error && <div>Signup Failed</div>}
												{e && <div>Login Failed </div>}
					</div>
				</form>
			</div>
		</div>
	)
};

export default SignUp;