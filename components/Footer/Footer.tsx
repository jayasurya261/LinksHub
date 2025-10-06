import Link from 'next/link'
import type { FC } from 'react'

export const Footer: FC = () => {
  return (
    <footer className="z-10 flex w-full items-baseline justify-center rounded-lg text-center px-2 mb-24 md:mb-0">
      <div className="text-sm leading-7 md:tracking-wide text-center text-black dark:text-theme-secondary-light">
        <div>&copy; {new Date().getFullYear()} Codesapiens | MIT License </div>
       
         
        
      </div>
    </footer>
  )
}
