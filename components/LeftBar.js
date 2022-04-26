import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { IoAddCircleOutline, IoLogOutOutline } from "react-icons/io5";
import { VscHome } from "react-icons/vsc";
import { BsPerson } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { callbackify } from 'util';


function LeftBar() {
  const {data: session} = useSession();
  const router = useRouter();
  const navData = [{title: "Home", path:'/', icon: <VscHome className='btn'/>},
   {title: "Profile", path: '/profile', icon: <BsPerson className="btn"/>},
    {title: "Post", path: '/post', icon: <IoAddCircleOutline className="btn"/>},
     {title: "Search", path: '/search', icon: <IoIosSearch className="btn"/>}]

  return (
    <div className="flex min-h- flex-col items-center sm:space-y-10 max-h-fit relative py-8">
      <Link href="/"><a>
          <Image src='/Logo.png' alt="Logo" width={100} height={100}/>
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

          {session && 
            <>
            <div onClick={() => {
              router.push("/");
              signOut();
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
          <Link href="/profile"><a className='absolute top-[40rem]'>

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
                </a></Link>
          </div>
          </>)
        }
    </div>
  )
}

export default LeftBar;
