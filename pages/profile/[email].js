import React, { useEffect, useState } from 'react';
import LeftBar from '../../components/LeftBar';
import Feed from '../../components/Feed';
import RightBar from '../../components/RightBar';
import Postinput from '../../components/Postinput';
import { useSession } from 'next-auth/react';
import Profile from "../../components/Profile";
import { collection, doc, getDoc, query, where, getDocs, limit, orderBy, onSnapshot } from "firebase/firestore";
import UserProfile from "../../components/UserProfile"
import { useRouter } from 'next/router';


function profile() {
  const {data : session, status} = useSession();
  const router = useRouter();
  const { email } = router.query;

  return (
    <div>
        <div>
      <div className="grid grid-cols-5 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">

        {/* left part */}
        <div className="max-h-screen sticky">
          <LeftBar />
        </div>
        {/* middle part */}


        <div className="col-span-4 md:col-span-2 lg:col-span-2 
            max-h-screen overflow-y-scroll scrollbar scrollbar-hide">


            {
              session?
              <>
                <UserProfile user={email}/>

              </>:
              <>
                <div className='flex text-slate-800 flex-col items-center p-5 space-y-5'>
                  <h1 className='font-bold text-4xl'>Welcome to the-post</h1>
                  <p className='font-semibold text-lg p-3'>Make some fun with this web app, we think you literally enjoy it.
                  To continue,
                  <span className='italic'> Sign in for free.</span></p>
                </div>
              </>

            }
        </div>
        {/* right part */}
        <div className='hidden lg:block max-h-screen sticky'>
        {
          session ?
          <>
          <RightBar />

          </>:
          <>
            Sign In
          </>
        }
        </div>
      </div> 
    </div>
    </div>
  )
}

export default profile;


// "col-span-4 md:col-span-2 lg:col-span-2 
//             max-h-screen overflow-y-scroll scrollbar scrollbar-thin 
//             scrollbar-thumb-gray-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"