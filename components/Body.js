import React from 'react';
import Footer from './Footer';

function Body() {
  return (
    <div className="">
        <div className="flex flex-col items-center space-y-0 relative h-[25rem]">
            <h1 className="text-[170px] font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">THE</h1>
            <h1 className="text-[165px] font-extrabold absolute top-36 text-transparent text-8xl bg-clip-text bg-gradient-to-br from-orange-400 to-pink-500">POST</h1>
        </div>
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center mb-8">
                <h1 className="text-5xl font-bold mb-8  font-mono">WHY THE-POST?</h1>
                <p className="mb-8">paragraph</p>
                

                {/* <div className="lg:flex lg:space-x-8 sm:space-y-10 lg:items-center">
                    <div className="h-[20rem] w-[20rem] bg-white rounded-3xl">Hello</div>
                    <div className="h-[20rem] w-[20rem] bg-white rounded-3xl">Hello</div>
                    <div className="h-[20rem] w-[20rem] bg-white rounded-3xl">Hello</div>
                </div> */}
            </div>

            <div className="flex flex-col items-center mb-8">
                <h1 className="text-3xl font-bold mb-8  font-mono">CONNECT WITH THE-POST</h1>
                <p className="mb-8">paragraph</p>
            </div>

            <div className="flex flex-col items-center mb-8">
                <h1 className="text-3xl font-bold mb-8  font-mono">WHAT THE-POST CAN DO?</h1>
                <p className="mb-8">paragraph</p>
            </div>

            <div className="flex flex-col items-center mb-8">
                <h1 className="text-3xl font-bold mb-8  font-mono">DEVELOPMENT OF THE-POST</h1>
                <p className="mb-8">paragraph</p>
            </div>
        </div>
        <div>
            <Footer />
        </div>
    </div>
  )
}

export default Body