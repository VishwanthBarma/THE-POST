import React from 'react';
import FeedHead from './FeedHead';
import Post from './Post';
import {data} from '../utils/data'

function Feed() {
  return (
    <div>
        <div className="border-b-2 border-slate-500">
            <FeedHead />
        </div>

        {/* Posts */}
        <div>
            {data.posts.map((post) => {
              return(
                <Post dp={post.dp} name={post.name} username={post.username} description={post.description} photo={post.photo} likes={post.likes} />
              )
            })}
        </div>
    </div>
  )
}

export default Feed