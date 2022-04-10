import React from 'react';
import { IoSearch } from 'react-icons/io5';
import SuggPeople from './SuggPeople';


function RightBar() {
  return (
      <div className="p-4 flex flex-col space-y-7">

        <div className="p-4 bg-slate-100 rounded-xl px-9 shadow-sm">
            <div className="cursor-pointer flex items-center space-x-2 relative mr-36">
                <IoSearch className="shrink-0 h-6 w-6"/>
                <input className="cursor-pointer absolute bg-transparent text-black placeholder-gray-700 pl-6 outline-none" type="text" placeholder="search for people"></input>
            </div>
        </div>

        <div>
            <p className="text-slate-400 font-semibold mt-6">SUGGESTED PEOPLE</p>
        </div>

        <div className="flex flex-col space-y-6">
        <SuggPeople />
        <SuggPeople />
        <SuggPeople />
        <SuggPeople />

        </div>



      </div>
  )
}

export default RightBar;