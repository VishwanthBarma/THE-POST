import React, { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { getProviders, signIn, useSession } from "next-auth/react";
import { collection, addDoc, serverTimestamp, getDoc, doc, query, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase";

function Signin({providers}) {
  // const {data} = useSession();
  // const [session, setSession] = useState({});
  
  // async function updateUser(){
  //   console.log("Entered the function...")
  //   console.log(session);
  //   if(session){
  //     console.log("Here...called.")
  //     const q = query(collection(db, "users"), where("email", "==", session.user.email));
  //     const querySnapshot = await getDocs(q);
  //     if(!querySnapshot.empty){
  //       console.log("User registered already.");
  //       console.log(querySnapshot);
  //     }else{
  //       console.log("User Not Registered");
  //       const docRef = await addDoc(collection(db, "users"), {
  //         fullname: session.user.name,
  //         email: session.user.email,
  //         username: session.user.username,
  //         uniqueid: session.user.uid,
  //         dp: session.user.image,
  //         time: serverTimestamp(),
  //       });
  //       console.log("Document written with ID: ", docRef.id);
  //     }
  //   }
  // }

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

                <div className='flex flex-col items-center bg-slate-200 hover:bg-green-400 hover:text-white p-3 rounded-3xl'>
                    <button className='flex items-center font-semibold text-lg' onClick={() => {
                      signIn(provider.id, {callbackUrl: "/api/store"});
                      // setSession(data);
                      // updateUser();
                    }}>
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