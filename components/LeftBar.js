import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { IoAddCircleOutline, IoLogOutOutline } from "react-icons/io5";
import { VscHome } from "react-icons/vsc";
import { BsPerson } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { db } from "../firebase";
import { collection, query, where, getDocs, limit, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import { useRouter } from 'next/router';
import Image from 'next/image';
// import Cookies from "js-cookie";


function LeftBar() {
  const {data: session} = useSession();
  const router = useRouter();
  const navData = [{title: "Home", path:'/', icon: <VscHome className='btn'/>},
   {title: "Profile", path: '/profile', icon: <BsPerson className="btn"/>},
    {title: "Post", path: '/post', icon: <IoAddCircleOutline className="btn"/>},
     {title: "Search", path: '/search', icon: <IoIosSearch className="btn"/>}]

  return (
    <div className="flex flex-col justify-between items-center space-y-10 h-screen relative py-8">
      <Link href="/"><a>
      <Image src='/Logo.png' alt="Logo" width={100} height={100}/>
      {/* <img src={Logo}></img> */}
          {/* <h2 className="text-xl md:text-3xl font-bold cursor-pointer">T<span className="text-slate-700">he</span>P<span className="text-slate-700">ost</span> </h2> */}
        </a></Link>

        <div className="flex flex-col items-center md:items-start space-y-7 absolute top-40">


        {
          navData.map((item, index) => {
            return (
              <>
              <div className="btn-div flex cursor-pointer items-center space-x-2 font-semibold">
              <Link href={item.path}><a  className={`${router.pathname.split('/')[1] === item.path.split('/')[1] ? "active": "hover:text-gray-600 hover:drop-shadow-sm hover:scale-110"} btn-div flex cursor-pointer items-center space-x-2 font-semibold`}>
                  {item.icon}
                  <h3 className="hidden md:block text-xl ">{item.title}</h3>
                  </a></Link>
                </div>
              </>
            )
          })
        }



          {/* <div className="btn-div flex cursor-pointer items-center space-x-2 font-semibold">
          <Link href="/"><a  className="btn-div flex cursor-pointer items-center space-x-2 font-semibold">
            <VscHome className="btn"/>
            <h3 className="hidden md:block text-xl ">Home</h3>

            </a></Link>
          </div> */}


          {/* <div className="btn-div flex cursor-pointer items-center space-x-2 font-semibold">
          <Link href="/profile"><a  className="btn-div flex cursor-pointer items-center space-x-2 font-semibold">
            <BsPerson className="btn"/>
            <h3 className="hidden md:block text-xl ">Profile</h3>
            </a></Link>
          </div>


          <div className="btn-div flex cursor-pointer items-center space-x-2 font-semibold">
          <Link href="/post"><a  className="btn-div  flex cursor-pointer items-center space-x-2 font-semibold">
            <IoAddCircleOutline className="btn"/>
            <h3 className="hidden md:block text-xl ">Post</h3>
            </a></Link>
          </div>

          <div className="btn-div cursor-pointer flex items-center space-x-2 font-semibold">

          <Link href="/search"><a  className="btn-div  flex cursor-pointer items-center space-x-2 font-semibold">
            <IoIosSearch className="btn"/>
            <h3 className="hidden md:block text-xl ">Search</h3>
            </a></Link>
            
          </div> */}





          {session && 
            <>
            <div onClick={() => {
              signOut();
              router.push("/");
            }} className='md:border-2 cursor-pointer border-black rounded-3xl flex justify-center p-1 md:px-4 hover:border-white hover:text-white hover:bg-black'>
            <button className='hidden md:block'>LogOut</button>
            <IoLogOutOutline className='btn md:hidden'/>
            </div>
            </>
          }

        </div>
        {
          session?
          (<>
          <Link href="/profile"><a>

            <div className="cursor-pointer flex space-x-2 items-center">
            <div>
              <img className="h-12 rounded-full" src={session.user.image}></img>
            </div>
            <div className="hidden md:block">
              <h6 className="text-sm font-bold">{session.user.name}</h6>
              <p className="text-gray-500 text-sm">@{session.user.username}</p>
            </div>
          </div>
            </a></Link>
          </>)
          :
          (
          <>
          <div className='hidden'>
          <Link href="/auth/signin" passHref><a>
                <div className='cursor-pointer bg-neutral-800 px-5 rounded-3xl shadow-lg shadow-orange-300 hover:translate-y-[-3px]'>
                  <button className='text-orange-100 font-semibold p-3' type="button">Sign In</button>
                </div>
                {/* <button type="button" className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-3xl text-md px-5 py-2.5 text-center mr-2 mb-2">Sign In</button> */}
                </a></Link>
          </div>
          </>)
        }
    </div>
  )
}

export default LeftBar;



// const docRef = await addDoc(collection(db, "users"), {
//   fullname: session.user.name,
//   email: session.user.email,
//   username: session.user.username,
//   uniqueid: session.user.uid,
//   dp: session.user.image,
//   time: serverTimestamp(),
// });