'use client'

import { useState, useEffect } from 'react'

const INITIAL_DELAY = 1000
const FIRST_NAME_LETTER_DELAY = 100
const PAUSE_BETWEEN_NAMES = 300
const LAST_NAME_LETTER_DELAY = 100

export default function HomePage() {
  const [visibleFirstName, setVisibleFirstName] = useState<number>(0)
  const [visibleLastName, setVisibleLastName] = useState<number>(0)
  const firstName = "Roman"
  const lastName = "Slack"

  useEffect(() => {
    const timer = setTimeout(() => {
      const firstNameInterval = setInterval(() => {
        setVisibleFirstName((prev) => {
          if (prev >= firstName.length) {
            clearInterval(firstNameInterval)
            
            setTimeout(() => {
              const lastNameInterval = setInterval(() => {
                setVisibleLastName((prev) => {
                  if (prev >= lastName.length) {
                    clearInterval(lastNameInterval)
                    return prev
                  }
                  return prev + 1
                })
              }, LAST_NAME_LETTER_DELAY)
            }, PAUSE_BETWEEN_NAMES)
            
            return prev
          }
          return prev + 1
        })
      }, FIRST_NAME_LETTER_DELAY)

      return () => clearInterval(firstNameInterval)
    }, INITIAL_DELAY)

    return () => clearTimeout(timer)
  }, [firstName.length, lastName.length])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <h1 className="text-6xl font-bold text-black" style={{fontFamily: 'Fira Code, Consolas, "Courier New", Monaco, monospace'}}>
        <span className="mr-4">
          {firstName.split('').map((char, index) => (
            <span
              key={index}
              className={`inline-block transition-opacity duration-500 ${
                index < visibleFirstName ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {char}
            </span>
          ))}
        </span>
        <span>
          {lastName.split('').map((char, index) => (
            <span
              key={index}
              className={`inline-block transition-opacity duration-500 ${
                index < visibleLastName ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {char}
            </span>
          ))}
        </span>
      </h1>
    </div>
  )
}