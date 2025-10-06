import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Logo from 'assets/logo.svg'
import Link from 'next/link'
import Button from 'components/Button'
import { sidebarData } from '../database/data'
import { Icons } from 'components/icons'
import { ReportBug } from 'components/ReportBug/Reportbug'

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
}

interface RatingForkProps {
  type: 'star' | 'fork'
  count: string | number
  link: string
  bgColor: string
  iconBgColor: string
  btnBgColor: string
  btnTextColor: string
  btnHoverColor: string
  btnText: string
}

const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  icon,
  title,
  description,
}) => (
  <div className="md:w-1/3 w-full dark:bg-slate-800 bg-theme-primary-light hover:bg-theme-primary-light/8 dark:hover:bg-slate-700 border border-theme-secondary/25 shadow-md p-6 mb-4 rounded-lg lg:h-44">
    <Link href={href}>
      <div className="flex items-center dark:text-text-quinary gap-2 mb-3">
        <div>{icon}</div>
        <span className="sm:inline">{title}</span>
      </div>
      <p className="text-sm sm:text-base text-text-quinary sm:h-24 h-fit lg:h-fit overflow-hidden font-sans text-ellipsis line-clamp-4">
        {description}
      </p>
    </Link>
  </div>
)

const RatingForkComponent: React.FC<RatingForkProps> = ({
  type,
  count,
  link,
  iconBgColor,
  btnBgColor,
  btnTextColor,
  btnHoverColor,
  btnText,
}) => {
  const iconStyle = { backgroundColor: iconBgColor }
  const [hovered, setHovered] = useState(false)
  const buttonStyle = {
    backgroundColor: hovered ? btnHoverColor : btnBgColor,
    color: btnTextColor,
    transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
  }

  return (
    <div
      className={`dark:text-white rounded-lg md:w-[200px] text-3xl p-4 dark:bg-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.05)] w-full`}
    >
      {type === 'star' ? (
        <Icons.ioStar
          className={`rounded-full text-black text-3xl p-1`}
          style={iconStyle} // Add style={iconStyle}
        />
      ) : (
        <Icons.gitBranch
          className={`rounded-full text-white text-3xl p-1`}
          style={iconStyle} // Add style={iconStyle}
        />
      )}
      <div className="text-3xl my-1">
        {count}
        <span className="text-lg m-1">
          {type === 'star' ? 'Stars' : 'Forks'}
        </span>
      </div>
      <Link href={link}>
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={buttonStyle}
          className="text-base p-2 rounded-lg text-center w-full"
        >
          {btnText}
        </button>
      </Link>
    </div>
  )
}

export default function Home() {
  const [welcome, setWelcome] = useState(true)
  const [community, setCommunity] = useState(true)
  const [resources, setResources] = useState(true)

  const [starCount, setStarCount] = useState(0)
  const [forkCount, setForkCount] = useState(0)

  useEffect(() => {
    const getStarForkCount = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/rupali-codes/LinksHub`
        )
        const data = await response.json()
        setStarCount(data.stargazers_count)
        setForkCount(data.forks)
      } catch (error) {
        console.error('Error fetching fork count:', error)
      }
    }

    getStarForkCount()
  }, [starCount, forkCount])

  const handleWelcome = () => {
    setWelcome((prev) => !prev)
  }
  const handleCommunity = () => {
    setCommunity((prev) => !prev)
  }
  const handleResources = () => {
    setResources((prev) => !prev)
  }

  return (
    <>
     
      <section
        data-custom="restrict-click-outside"
        className="flex flex-col max-h-[calc(100vh - 165px)] max-w-[calc(100% - 165px)] flex-col sm:m-3 lg:m-8"
      >
        <ReportBug />
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl dark:text-text-tertiary mb-0 mt-6 md:mt-0">
              Welcome
            </h2>
            <div className="hidden sm:flex" onClick={handleWelcome}>
              {welcome ? (
                <Icons.rxCaretDown size={50} className="cursor-pointer" />
              ) : (
                <Icons.rxCaretRight size={50} className="cursor-pointer" />
              )}
            </div>
          </div>
          {welcome && (
            <>
              <p className="text-md text-text-quinary">
                Welcome aboard, we&apos;re excited to have you at CodeSapiens Resource Hub
              </p>
              
            </>
          )}
        </div>
        <div>
         
          
         
        
        </div>
        <div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-2xl dark:text-text-tertiary">Resources</div>
            <div className="hidden sm:flex" onClick={handleResources}>
              {resources ? (
                <Icons.rxCaretDown size={50} className="cursor-pointer" />
              ) : (
                <Icons.rxCaretRight size={50} className="cursor-pointer" />
              )}
            </div>
          </div>
          <div>
            {resources && (
              <>
                <span className="text-text-quinary">
                  We&apos;ve curated a wealth of resources just for you. Go
                  ahead and explore at your own pace.
                </span>
                <ul className="flex flex-wrap mt-4 gap-5">
                  {resources &&
                    sidebarData.map((el, i) => (
                      <Link
                        key={i}
                        href={`/${el.category}`}
                        className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(33.33%-1rem)] group"
                      >
                        <div className="border border-theme-secondary border-opacity-25 shadow-sm dark:border dark:border-theme-primary dark:border-opacity-20 duration-300 transition-all dark:bg-slate-800 dark:hover:bg-slate-700 bg-theme-primary-light hover:bg-theme-primary-light/8 flex items-center justify-between rounded-xl sm:h-16 h-fit">
                          <div className="p-5 truncate ...">
                            {el.category.toUpperCase()}
                          </div>
                          <div>
                            <Icons.arrowRightLong className="m-4 hidden group-hover:block" />
                          </div>
                        </div>
                      </Link>
                    ))}
                </ul>
              </>
            )}
          </div>
        </div>
       
      </section>
    </>
  )
}
