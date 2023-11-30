import Link from 'next/link'
import React from 'react'
import { Button } from '../components/ui/button'
import { Redo } from 'lucide-react'
import Image from 'next/image'

const Home = () => {
    const headerStyle = {
        backgroundImage: "url('/header.png')"
      }

  return (
    <section className="leading-normal tracking-normal bg-cover bg-fixed" style={headerStyle}>
    <div className="h-full">
      {/* <!--Main--> */}
      <div className="container pt-24 md:pt-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        {/* <!--Left Col--> */}
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-3xl md:text-5xl text-primary opacity-75 font-bold leading-tight text-center md:text-left">
          Unleash Your Imagination,<br />
            <span className="text-[#ca1a40] px-2  text-3xl md:text-5xl font-bold">
            Refine Reality!
            </span>
          </h1>
          <p className="leading-normal font-bold md:text-2xl text-[#b41739] mb-8 text-center md:text-left">
          Draw-it - Transform Your Sketches into Stunning Realistic Art with AI Magic!
          </p>

          
        </div>

        {/* <!--Right Col--> */}
        <div className="w-full xl:w-3/5 p-12 overflow-hidden">
        <div>
            <h2 className='text-2xl md:text-4xl text1 font-bold mb-4 text-[#9d1432]'>Turn a simple sketch like this into an amazing art!</h2>

          </div>
          <Image alt='Example Image' className="mx-auto rounded-2xl w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-50" src="sketch.png" />
        <Redo className='w-60 h-40  absolute z-10 rotate-[100deg] text-primary transform transition hover:scale-125 duration-700 ease-in-out hover:rotate-6' />
        </div>
        <div className="w-full xl:w-3/5 p-12 overflow-hidden">
          <Image alt='Example Image' className="mx-auto rounded-2xl  w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" src="result.png" />
        </div>

        <div className="mx-auto md:pt-16">
          <p className="text-[#5a0b1c] font-bold pb-8 lg:pb-6 text-center text-3xl">
            Get Started:
          </p>
          <div className="flex w-full items-center justify-center md:justify-start pb-24 lg:pb-0 fade-in">
            <Link href="/generate" className="h-12 pr-12 transform  hover:scale-125 duration-300 ease-in-out" >
                <Button>
                    Generate
                </Button>
            </Link>
            <Link href="/collection" className="h-12 text-primary pr-12 transform hover:scale-125 duration-300 ease-in-out" >
            <Button variant={"ghost"} >
                    See Collection &rarr;
            </Button>
            </Link>
          </div>
        </div>

        {/* <!--Footer--> */}
        <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
          <a className="text-gray-500 no-underline hover:no-underline" href="#">&copy; DRAW-IT 2023</a>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Home