'use client'

import {useQuery } from 'convex/react'
import { api } from "../../convex/_generated/api";
import { ImageOff } from 'lucide-react';
import Image from 'next/image';


const Collection = () => {
   const art = useQuery(api.art.getArts)
   const filteredArts = (art ?? []).sort((x,y) => {
    return y._creationTime - x._creationTime
   })
   const headerStyle = {
    backgroundImage: "url('/header.png')"
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-16 bg-cover bg-fixed" style={headerStyle}>
    <h2 className='text-3xl md:text-5xl text1 font-bold mb-4'>Recent Community Creations</h2>
    <p className='text-muted-foreground mb-4 text-md md:text-2xl'>Dive into the realm of artistry with our collection of recent creations. </p>
    {filteredArts.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
    {filteredArts.map((art) => (
      <div key={art._id} className='bg-white rounded-xl flex flex-col items-center  p-5 border border-muted-foreground shadow-xl'>
      <Image
        width="256"
        height="256"
        // @ts-ignore
        src={art.result}
        alt={art.prompt}
        className="rounded-lg shadow-lg cursor-pointer"
        loading="lazy"
        onClick={() => window.open(art.result)}
      />
      <div className=''>
      <p className="text-center text-md text-muted-foreground mt-5">{art.prompt}</p>
      </div>
      </div>
    ))}
  </div>
) : (
  <div className="grid grid-cols-1 items-center">
    <ImageOff className="h-64 w-64 text-muted-foreground" />
    <p className="text-center text-xl text-muted-foreground mt-5">No art yet... be the first!</p>
  </div>
)}
    {/* </div> */}
  </main>
  )
}

export default Collection