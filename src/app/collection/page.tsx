'use client'

import {useQuery } from 'convex/react'

interface Art {
    id: string;
    prompt: string;

  }

const Collection = () => {
    //@ts-ignore
    const showCollection = useQuery('art:getArt')



  return (
    <div>
        
        {showCollection?.map((art: Art) => (
            <div key={art.id}>{art.prompt}</div>
        ))}
    </div>
  )
}

export default Collection