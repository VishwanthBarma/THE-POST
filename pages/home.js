import React from 'react';
import LeftBar from '../components/LeftBar';
import Feed from '../components/Feed';
import RightBar from '../components/RightBar';

function Main() {
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
            max-h-screen overflow-y-scroll scrollbar scrollbar-thin 
            scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          <Feed />
        </div>
        {/* right part */}
        <div className='hidden lg:block max-h-screen sticky'>
          <RightBar />
        </div>
      </div> 
    </div>
    </div>
  )
}

export default Main