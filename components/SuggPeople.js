import { useSession } from 'next-auth/react'
import React from 'react'

function SuggPeople({dp, fullname, username}) {
  const {data: session} = useSession();
  if(username == session.user.username){
    return;
  }
  
  return (
    <div>
        <div className="flex space-x-2 items-center">
                <div className="cursor-pointer flex items-center space-x-2">

                <div>
                    <img className="shrink-0 h-10 rounded-full" src={dp}></img>
                </div>
                <div className="">
                    <h6 className="text-[13.5px] font-bold">{fullname}</h6>
                    <p className="text-gray-500 text-[13.5px]">@{username}</p>
                </div>
                </div>

                <div>
                    <p className='hover:text-blue-500 cursor-pointer ml-4 text-blue-400'>Follow</p>
                </div>
            </div>
    </div>
  )
}

export default SuggPeople