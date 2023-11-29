'use client'
import Link from 'next/link'


const Nav = () => {
  return (
    <nav className="border-b py-4">
      <div className="container mx-auto flex justify-between">
        <div>LOGO</div>
        <nav className="flex gap-4">
          <Link href="/">Generate</Link>
          <Link href="/collection">Collection</Link>
        </nav>
      
      </div>
    </nav>
  )
}

export default Nav