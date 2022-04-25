import React, { useState } from 'react';
import LeftBar from '../../components/LeftBar';
import RightBar from '../../components/RightBar';
import Following from "../../components/Following";
import { useSession } from 'next-auth/react';

function Main() {
  const {data : session} = useSession();
  const [loading, setLoading] = useState(false);
  
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
                <Following />

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


// "col-span-4 md:col-span-2 lg:col-span-2 
//             max-h-screen overflow-y-scroll scrollbar scrollbar-thin 
//             scrollbar-thumb-gray-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"