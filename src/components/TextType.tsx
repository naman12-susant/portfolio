'use client'

import { createElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './TextType.css'

type VariableSpeed = {
  min: number
  max: number
}

type TextTypeProps = {
  text: string | string[]
  as?: React.ElementType
  typingSpeed?: number
  initialDelay?: number
  pauseDuration?: number
  deletingSpeed?: number
  loop?: boolean
  className?: string
  showCursor?: boolean
  hideCursorWhileTyping?: boolean
  cursorCharacter?: React.ReactNode
  cursorClassName?: string
  cursorBlinkDuration?: number
  textColors?: string[]
  variableSpeed?: VariableSpeed
  onSentenceComplete?: (sentence: string, index: number) => void
  startOnVisible?: boolean
  reverseMode?: boolean
} & Omit<React.HTMLAttributes<HTMLElement>, 'children'>

export default function TextType({
  text,
  as: Component = 'span',
  typingSpeed = 20,
  initialDelay = 0,
  pauseDuration = 900,
  deletingSpeed = 12,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnVisible)
  const cursorRef = useRef<HTMLSpanElement | null>(null)
  const containerRef = useRef<HTMLElement | null>(null)

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])
  const effectiveTypingSpeed = Math.max(8, Math.min(typingSpeed, 20))
  const effectiveDeletingSpeed = Math.max(6, Math.min(deletingSpeed, 12))

  const getLineText = (lineIndex: number) => {
    const line = textArray[lineIndex] ?? ''
    return reverseMode ? line.split('').reverse().join('') : line
  }

  const getFullTextDisplay = (charIndex: number, lineIndex: number) => {
    const previousLines = textArray
      .slice(0, lineIndex)
      .map((line) => (reverseMode ? line.split('').reverse().join('') : line))
      .join('\n')
    const currentLine = getLineText(lineIndex).slice(0, charIndex)
    if (!previousLines) return currentLine
    return `${previousLines}\n${currentLine}`
  }

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed
    const { min, max } = variableSpeed
    return Math.random() * (max - min) + min
  }, [variableSpeed, typingSpeed])

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return 'inherit'
    return textColors[currentTextIndex % textColors.length]
  }

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [startOnVisible])

  useEffect(() => {
    if (!showCursor || !cursorRef.current) return

    gsap.set(cursorRef.current, { opacity: 1 })
    const blink = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    })

    return () => {
      blink.kill()
    }
  }, [showCursor, cursorBlinkDuration])

  useEffect(() => {
    if (!isVisible) return

    let timeoutId: number | undefined
    const currentText = textArray[currentTextIndex]
    const lineText = getLineText(currentTextIndex)

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (currentCharIndex === 0) {
          setIsDeleting(false)
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return
          }

          if (onSentenceComplete) {
            onSentenceComplete(currentText, currentTextIndex)
          }

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length)
          setCurrentCharIndex(0)
          timeoutId = window.setTimeout(() => {}, pauseDuration)
        } else {
          timeoutId = window.setTimeout(() => {
            setCurrentCharIndex((prev) => prev - 1)
            setDisplayedText(getFullTextDisplay(currentCharIndex - 1, currentTextIndex))
            }, effectiveDeletingSpeed)
        }
      } else {
        if (currentCharIndex < lineText.length) {
          timeoutId = window.setTimeout(() => {
            const nextCharIndex = currentCharIndex + 1
            setCurrentCharIndex(nextCharIndex)
            setDisplayedText(getFullTextDisplay(nextCharIndex, currentTextIndex))
            }, variableSpeed ? getRandomSpeed() : effectiveTypingSpeed)
        } else if (currentTextIndex < textArray.length - 1) {
          timeoutId = window.setTimeout(() => {
            setCurrentTextIndex((prev) => prev + 1)
            setCurrentCharIndex(0)
          }, pauseDuration)
        } else if (loop) {
          timeoutId = window.setTimeout(() => {
            setIsDeleting(true)
          }, pauseDuration)
        }
      }
    }

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeoutId = window.setTimeout(executeTypingAnimation, initialDelay)
    } else {
      executeTypingAnimation()
    }

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCharIndex, displayedText, isDeleting, typingSpeed, deletingSpeed, pauseDuration, textArray, currentTextIndex, loop, initialDelay, isVisible, reverseMode, variableSpeed, onSentenceComplete])

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < textArray[currentTextIndex].length || isDeleting)

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `text-type ${className}`.trim(),
      ...props,
    },
    <span className="text-type__content" style={{ color: getCurrentTextColor() }}>
      {displayedText}
    </span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`.trim()}
      >
        {cursorCharacter}
      </span>
    ),
  )
}
