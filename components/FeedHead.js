import React from 'react'

function FeedHead({name}) {
  return (
    <div className="flex items-center justify-center py-5">
        <h2 className="text-2xl font-semibold cursor-pointer">{name}</h2>
    </div>
  )
}

export default FeedHead