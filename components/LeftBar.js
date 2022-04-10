import React from 'react';
import { HiHome } from 'react-icons/hi';
import { BsPersonFill } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import Link from 'next/link';



function LeftBar() {
  return (
    <div className="flex flex-col justify-between items-center space-y-10 h-screen relative py-8">
      <Link href="/">
        <a>
          <h2 className="text-xl md:text-3xl font-bold cursor-pointer">T<span className="text-slate-700">he</span>P<span className="text-slate-700">ost</span> </h2>
        </a>
      </Link>
        <div className="flex flex-col space-y-7 absolute top-40">
          <div className="btn-div flex cursor-pointer items-center space-x-2 font-semibold">
            <HiHome className="btn"/>
            <h3 className="hidden md:block text-xl ">Home</h3>
          </div>
          <div className="btn-div flex cursor-pointer items-center space-x-2 font-semibold">
            <BsPersonFill className="btn"/>
            <h3 className="hidden md:block text-xl ">Profile</h3>
          </div>
          <div className="btn-div lg:hidden cursor-pointer flex items-center space-x-2 font-semibold">
            <IoSearch className="btn"/>
            <h3 className="hidden md:block text-xl ">Search</h3>
          </div>
        </div>
        <div className="cursor-pointer flex space-x-2 items-center">
          <div>
            <img className="h-12 rounded-full" src="https://avatars.githubusercontent.com/u/72876374?v=4"></img>
          </div>
          <div className="hidden md:block">
            <h6 className="text-sm font-bold">Barma Vishwanth</h6>
            <p className="text-gray-500 text-sm">@barmavishwanth</p>
          </div>
        </div>
    </div>
  )
}

export default LeftBar;