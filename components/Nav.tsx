'use client'
import Link from 'next/link'


const Nav = () => {
  return (
    <nav className="border-b py-6 shadow-xl sticky top-0 bg-primary-foreground">
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