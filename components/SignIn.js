import React from 'react';
import { FaGoogle } from "react-icons/fa";


function SignIn() {
  return (
    <div className="bg-black h-screen text-white flex flex-col items-center">
        <div className='bg-white text-black h-[50rem] w-[29rem] mt-[3rem] rounded-3xl p-9'>
            <div className="flex flex-col items-center">
                <h1 className="font-bold mt-5 text-3xl">SIGN IN FOR FREE</h1>
            </div>
            <div className='flex flex-col items-center relative'>
                <h1 className='text-[8rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400'>THE</h1>
                <h1 className='text-[8rem] font-bold absolute top-[7rem] text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-500'>POST</h1>
            </div>
        </div>
    </div>
  )
    {/* <form method='POST' onSubmit={(event) => handleSignup(event)}>

        <div className="bg-white text-black h-[50rem] w-[29rem] mt-[3rem] rounded-3xl">
            <div className="flex flex-col items-center">
                <h1 className="font-bold mt-5 text-3xl">SIGN IN FOR FREE</h1>
            </div>
            <div className="p-[4.5rem]">
                <div>
                    <h2 className="font-bold mb-2">FULLNAME</h2>
                    <div className="h-[50px] bg-slate-100 w-[20rem] flex items-center justify-center rounded-2xl">
                        <input type="text" name='user_fullname' required aria-required="true" className="cursor-pointer outline-none bg-transparent" placeholder="Enter your full name"></input>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold mt-5 mb-2">USERNAME</h2>
                    <div className="h-[50px] bg-slate-100 w-[20rem] flex items-center justify-center rounded-2xl">
                        <input type="text" name='user_username' required aria-required="true" className="cursor-pointer outline-none bg-transparent" placeholder="Enter your user name"></input>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold mt-5 mb-2">EMAIL</h2>
                    <div className="h-[50px] bg-slate-100 w-[20rem] flex items-center justify-center rounded-2xl">
                        <input type="email" name='user_email' required aria-required="true" className="cursor-pointer outline-none bg-transparent" placeholder="name@gmail.com"></input>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold mt-5 mb-2">PASSWORD</h2>
                    <div className="h-[50px] bg-slate-100 w-[20rem] flex items-center justify-center rounded-2xl">
                        <input type="password" name='user_password' required aria-required="true" className="cursor-pointer outline-none bg-transparent " placeholder="Password"></input>
                    </div>
                    <p className="text-sm">Between 8-14 characters</p>
                </div>
                <div className="mt-8 mb-4 flex flex-col space-y-3">
                    <button type="submit" class="w-[8rem] text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-3xl text-md px-5 py-2.5 text-center mr-2 mb-2">SIGNUP</button>
                    <p className='text-sm ml-3'>ALREADY AN USER?<a href="" className='text-blue-500 ml-2'>LOGIN</a></p>
                </div>
                
                <hr></hr>

                <div className="flex justify-center mt-9">
                    <button type="submit" class="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-3xl text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><FaGoogle className='mr-3'/>Continue with Google</button>
                </div>
            </div>
        </div>
    </form> */}
}

export default SignIn;