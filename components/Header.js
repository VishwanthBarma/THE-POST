import React from 'react';
import Link from 'next/link';

function Header() {
  return (
    <div className="z-50 sticky top-0 flex items-center justify-between p-8 border-b-2 border-slate-300 backdrop-blur-xl mb-8 bg-zinc-800 bg-opacity-40">
        <Link href="/">
          <a>
          <h2 className="shrink-0 text-3xl font-bold cursor-pointer">T<span className="">he</span>P<span className="">ost</span> </h2>
          </a>
        </Link>
        <div className="flex items-center justify-end space-x-4">
            <Link href="/login">
                <a>
                <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-3xl text-md px-5 py-2.5 text-center mr-2 mb-2">LOGIN</button>
                </a>
            </Link>
            <Link href="/signup">
                <a>
                <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-3xl text-md px-5 py-2.5 text-center mr-2 mb-2">SIGNUP</button>
                </a>
            </Link>
        </div>
    </div>
  )
}

export default Header