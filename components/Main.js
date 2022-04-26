import React, { useState } from 'react';
import LeftBar from './LeftBar';
import Feed from './Feed';
import RightBar from './RightBar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function Main() {
  const {data : session} = useSession();
  
  return (
    <div className={`${session? "": "bg-[url('../asset/Component.png')]"} bg-cover h-screen`}>
        <div>
      <div className="grid grid-cols-5 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">

        {/* left part */}
        <div className="max-h-screen sticky">
        {
          session &&
          <>
          <LeftBar />
          </>
        }
        </div>
        {/* middle part */}


        <div className={`${!session? "col-span-5": "col-span-4 md:col-span-2 lg:col-span-2"}  
            max-h-screen overflow-y-scroll scrollbar scrollbar-hide`}>


            {
              session?
              <>
                <Feed />
                {/* <Postinput/> */}

              </>:
              <>
                <div className='flex text-slate-800 flex-col items-center py-10 p-5 space-y-5 min-h-100%'>
                  <h1 className='font-bold text-3xl sm:text-4xl drop-shadow-md shadow-orange-400'>Welcome to the-post</h1>
                  <p className='font-semibold text-lg sm:text-xl p-3 drop-shadow-sm'>Make fun with this web app, we think you really enjoy it. Web app like twitter,
                  To continue,
                  <span className='italic'> Sign In for free.</span></p>
                  <div className=''>
                    <Link href="/auth/signin" passHref><a>
                          <div className='cursor-pointer bg-neutral-800 px-5 rounded-3xl shadow-lg shadow-orange-300 hover:translate-y-[-3px]'>
                            <button className='text-orange-100 font-semibold p-3' type="button">Sign In</button>
                          </div>
                          </a></Link>
                    </div>
                    <div className='flex flex-col items-center relative sm:h-[22rem] h-[19.5rem]'>
                        <h1 className='drop-shadow-lg sm:text-[10rem] text-[8rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400'>THE</h1>
                        <h1 className='drop-shadow-lg sm:text-[10rem] text-[8rem] font-bold absolute top-[9rem] text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-500'>POST</h1>
                    </div>
                    <div className='sm:p-7 px-4 sm:py-10 py-5 flex items-center bg-slate-100 rounded-3xl bg-opacity-50 border-2 shadow-lg backdrop-blur-sm'>
                  <h1 className=' text-xl text-slate-500'>
                     This is an open source project completely built for fun.Licensed under the 
GPLv3.
                    <a className='sm:text-blue-500 text-sky-400' href='https://github.com/VishwanthBarma/THE-POST'> Source code</a>
                  </h1>
                </div>

                  </div>
              </>

            }
        </div>
        {/* right part */}
        <div className='hidden lg:block max-h-screen sticky'>
        {
          session?
          <>
          <RightBar />
          </>:
          <></>
        }
        </div>
      </div> 
    </div>
    </div>
  )
}

export default Main;
