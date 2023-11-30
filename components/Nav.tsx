'use client'
import Link from 'next/link'


const Nav = () => {
  return (
    <nav className="border-b py-6 shadow-xl sticky top-0 bg-primary-foreground z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
        <h2 className="text-xl md:text-3xl font-bold text-center text1 tracking-tightest text-white px-2"><span className="before:block before:absolute before:-inset-0 before:-skew-y-2 before:bg-primary relative inline-block px-2 "><span className="relative text-white m-1">Draw-it</span></span></h2>
        </Link>
        <nav className="flex gap-4">
          <Link href="/generate" className='text1 px-2 font-semibold hover:bg-primary hover:text-white'>Generate</Link>
          <Link href="/collection" className='text1 px-2 font-semibold hover:bg-primary hover:text-white'>Collection</Link>
        </nav>
      </div>
    </nav>
  )
}

export default Nav