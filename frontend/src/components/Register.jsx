import React from 'react'
import axios from "axios";
import { useRef, useState } from "react";

function Register({ setCurrUser, setRegister }) {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [err, setErr] = useState('Something went wrong');

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            await axios.post("/users/register", newUser);
            setCurrUser(newUser.username)
            setRegister(false)
        } catch (err) {
            if (err.response.data.keyValue.username)
                setErr("Username already exist")

            else setErr("Email already exist")


            setError(true);
        }
    };

    return (

        <div className=' absolute top-0 right-0 left-0 bottom-0 h-full p-6 m-auto flex justify-center w-full items-center bg-slate-100 bg-opacity-60'>
            <form className=' w-1/3 p-1' onSubmit={handleSubmit}>
                <div className=' text-4xl justify-center'>
                    <p className='text-gray-600 font-bold font-serif text-center '>Register</p>
                </div>
                <div>
                    <input type='text' className='m-1 p-2 w-full focus:outline-none h-10 text-base rounded-md' ref={usernameRef} placeholder='Username' />
                </div>
                <div>
                    <input type='text' className='m-1 p-2 w-full focus:outline-none h-10 text-base rounded-md' ref={emailRef} placeholder='Email ' />
                </div>
                <div>
                    <input type='password' className='m-1 p-2 w-full h-10 focus:outline-none text-base rounded-md' placeholder='Password' ref={passwordRef} />
                </div>
                <button type='submit' className=' bg-red-600 text-white p-2 rounded-lg font-medium text-base w-full m-1'>Register</button>
                {success && (
                    <span className=" text-green-500 text-base ml-6 ">Successfull. You can login now!</span>
                )}
                {error && <span className=" text-red-600  text-base ml-6 ">{err}</span>}
            </form>

        </div>
    )
}

export default Register