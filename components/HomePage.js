import React from 'react';
import Header from './Header';
import Body from './Body';
import Link from 'next/link'

function HomePage() {
  return (
    <div className="bg-black text-white">


        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <Header />
            {/* body */}
            <Body />
        </div>
    </div>
  )
}

export default HomePage