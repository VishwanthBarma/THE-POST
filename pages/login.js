import React from 'react';
import { FaGoogle } from "react-icons/fa";


function Login() {

  return (
    <div className="bg-black h-screen text-white flex flex-col items-center">
    <form onSubmit={event => handleLogin(event)}>

        <div className="bg-white text-black h-[40rem] w-[29rem] mt-[8rem] rounded-3xl">
            <div className="flex flex-col items-center">
                <h1 className="font-bold mt-5 text-3xl">WELCOME BACK</h1>
            </div>
            <div className="p-[4.5rem]">
                <div>
                    <h2 className="font-bold mb-2">EMAIL</h2>
                    <div className="h-[50px] bg-slate-100 w-[20rem] flex items-center justify-center rounded-2xl">
                        <input type="email" name="user_email" required aria-required="true" className="cursor-pointer outline-none bg-transparent" placeholder="name@gmail.com"></input>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold mt-5 mb-2">PASSWORD</h2>
                    <div className="h-[50px] bg-slate-100 w-[20rem] flex items-center justify-center rounded-2xl">
                        <input type="password" name="user_password" required aria-required="true" className="cursor-pointer outline-none bg-transparent " placeholder="password"></input>
                    </div>
                </div>
                <div className="mt-10 mb-4 flex flex-col space-y-3">
                    <button type="submit" class="w-[8rem] text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-3xl text-md px-5 py-2.5 text-center mr-2 mb-2">LOGIN</button>
                    <p className='text-sm ml-3'>NEW TO THE-POST?<a href="/signup" className='text-blue-500 ml-2'>SIGNUP</a></p>
                </div>
                
                <hr></hr>

                <div className="flex justify-center mt-9">
                    <button type="submit" class="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-3xl text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><FaGoogle className='mr-3'/>Continue with Google</button>
                </div>
            </div>
        </div>
    </form>
    </div>
  );
}

export default Login;