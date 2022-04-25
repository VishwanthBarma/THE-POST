import React from 'react';
import Link from 'next/link';


function SearchProfile({userData: user}) {

  return (
    <div className='py-3'>
    <Link href={{
        pathname: '/profile/[email]',
        query: {email : user.email},
    }}>
        <a>
            <div className='flex space-x-3 items-center cursor-pointer hover:translate-y-[-3px] hover:drop-shadow-lg'>
                <img className='rounded-full md:h-[40px] h-[38px]' src={user.dp}></img>
                <div>
                    <h1 className='font-semibold text-sm md:text-md'>@ {user.username}</h1>
                    <h1 className='text-[12px] md:text-sm text-slate-500'>{user.email}</h1>
                </div>
            </div>
        </a>
    </Link>
    </div>
  )
}

export default SearchProfile;