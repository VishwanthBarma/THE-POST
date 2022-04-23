import React, { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { getProviders, signIn, useSession } from "next-auth/react";
import { collection, addDoc, serverTimestamp, getDoc, doc, query, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase";

function Signin({providers}) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <div>

          <div className="bg-black h-screen text-white flex flex-col items-center">
            <div className='bg-white text-black h-[40rem] w-[29rem] mt-[3rem] rounded-3xl p-9'>
                <div className="flex flex-col items-center">
                    <h1 className="font-bold mt-5 text-3xl">SIGN IN FOR FREE</h1>
                    <p className=''>Built for educational purposes only.</p>
                </div>
                <div className='flex flex-col items-center relative h-[22rem]'>
                    <h1 className='text-[8rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400'>THE</h1>
                    <h1 className='text-[8rem] font-bold absolute top-[7rem] text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-500'>POST</h1>
                </div>

                <div onClick={() => {
                      signIn(provider.id, {callbackUrl: "/api/store"});
                    }} className='cursor-pointer flex flex-col items-center bg-neutral-800  p-3 rounded-3xl shadow-lg shadow-orange-200 hover:translate-y-[-3px]'>
                    <button className='flex items-center font-semibold text-lg text-orange-100'>
                        <FaGoogle className='mr-3'/>
                        Sign in with {provider.name}
                    </button>
                </div>
            </div>
        </div>

          </div>
        </div>

      ))}
    </>
  )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
      props: { providers },
    }
}

export default Signin;


// onClick={() => signIn(provider.id, {callbackUrl: "/"})}