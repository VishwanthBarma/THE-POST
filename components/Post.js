import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { HiStar } from 'react-icons/hi'

function Post({dp, name, username, description, photo, likes}) {
  return (
    <div className="p-4 md:p-7 border-b-[1px] border-slate-100 shadow-md">
        {/* post header */}
        <div>
            <div className="cursor-pointer flex space-x-2 items-center">
            <div className=''>
                <img className="h-12 w-12 rounded-full object-cover" src={dp}></img>
            </div>
            <div className="">
                <h6 className="text-sm font-bold">{name} <span className="hidden md:inline font-light">{username}</span></h6>
                <p className="text-gray-500 text-sm">05 April 2022</p>
            </div>
            </div>
        </div>
        {/* post description */}

        <div className="px-[5px] md:px-[60px] mt-2">
            <p>{description}</p>
        </div>

        {/* post photo */}

        <div className='md:max-h-[30rem] max-h-[20rem] max-w-[22rem] md:max-w-[30rem] md:mx-[60px] my-6'>
                <img className='object-cover rounded-3xl' src={photo}></img>
        </div>

        {/* post likes and comments */}

        <div className='px-[5px] md:px-[60px]'>
            <div className='flex item-center space-x-9 relative'>
                <div className='cursor-pointer flex item-center space-x-2  hover:text-red-500 active:text-red-700'>
                    <FaHeart className='h-6 w-6 hover:drop-shadow-lg'/>
                    <h2 className='hover:drop-shadow-lg'>{likes}</h2>
                </div>
                <div className='cursor-pointer flex items-center space-x-1 absolute left-16 bottom-[-4px] hover:text-red-500 active:text-red-700'>
                    <HiStar className='h-8 w-8 hover:drop-shadow-lg'/>
                    <p className='hover:drop-shadow-lg'>save</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post