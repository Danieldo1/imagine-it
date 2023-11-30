'use client'
import Link from 'next/link'


const Nav = () => {
  return (
    <nav className="border-b py-6 shadow-xl sticky top-0 bg-primary-foreground">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-3xl font-bold text-center text1 tracking-tightest text-white bg-primary px-2">Draw-it</h2>
        <nav className="flex gap-4">
          <Link href="/" className='text1 px-2 font-semibold hover:bg-primary hover:text-white'>Generate</Link>
          <Link href="/collection" className='text1 px-2 font-semibold hover:bg-primary hover:text-white'>Collection</Link>
        </nav>
      </div>
    </nav>
  )
}

export default Nav