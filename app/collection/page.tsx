'use client'

import {useQuery } from 'convex/react'
import { api } from "../../convex/_generated/api";


const Collection = () => {
   const art = useQuery(api.art.getArts)
   const filteredArts = (art ?? []).sort((x,y) => {
    return y._creationTime - x._creationTime
   })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <h2>Recent Sketches</h2>
    <div className="grid grid-cols-4 gap-4">
      {filteredArts.map((art) => (
        <img key={art._id} width="256" height="256" src={art.result} />
      ))}
    </div>
  </main>
  )
}

export default Collection