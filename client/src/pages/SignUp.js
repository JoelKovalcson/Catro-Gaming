import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

function SignUp() {
    
    const [form, setForm] = useState(SignUpForm)
    
    return ( 
        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
            role="tablist">
                <li class="nav-item" role="presentation">
                    <button href="#tabs-signup" class="
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
                    aria-selected="true" onClick={() => setForm(SignUpForm)}>Sign Up</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button href="#tabs-login" class="
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
                    aria-selected="false" onClick={() => setForm(LoginForm)}>Login</button>
                </li>
            </ul>
            <div>
            {form}
            {setForm}
            </div>
        </div>
    )
};

export default SignUp;