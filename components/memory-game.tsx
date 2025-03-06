"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import confetti from "canvas-confetti"

// Kid-friendly emoji pairs
const emojis = ["🚀", "🌈", "🦄", "🐠", "🦋", "🌟", "🐶", "🎈"]

type CardType = {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [gameComplete, setGameComplete] = useState<boolean>(false)
  const [isChecking, setIsChecking] = useState<boolean>(false)

  // Initialize game
  useEffect(() => {
    startGame()
  }, [])

  // Check for game completion
  useEffect(() => {
    if (matchedPairs === emojis.length && matchedPairs > 0) {
      setGameComplete(true)
      triggerConfetti()
    }
  }, [matchedPairs])

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true)
      const [firstIndex, secondIndex] = flippedCards

      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        // Match found
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === firstIndex || index === secondIndex ? { ...card, isMatched: true } : card,
          ),
        )
        setMatchedPairs((prev) => prev + 1)
        setFlippedCards([])
        setIsChecking(false)
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([])
          setIsChecking(false)
        }, 1000)
      }

      setMoves((prev) => prev + 1)
    }
  }, [flippedCards, cards])

  const startGame = () => {
    // Create pairs of cards with emojis
    const cardPairs = [...emojis, ...emojis].map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))

    // Shuffle cards
    const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5)

    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setGameComplete(false)
  }

  const handleCardClick = (index: number) => {
    // Prevent clicking if already checking two cards or card is already flipped/matched
    if (isChecking || flippedCards.length >= 2 || flippedCards.includes(index) || cards[index].isMatched) {
      return
    }

    // Flip the card
    setCards((prevCards) => prevCards.map((card, i) => (i === index ? { ...card, isFlipped: true } : card)))

    // Add to flipped cards
    setFlippedCards((prev) => [...prev, index])
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-center">
        Neon Memory Match
      </h1>

      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between w-full max-w-md">
        <div className="text-blue-400 text-lg mb-4 sm:mb-0">
          <span className="text-blue-300">Moves:</span> {moves}
        </div>

        <Button
          onClick={startGame}
          className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all"
        >
          New Game
        </Button>

        <div className="text-blue-400 text-lg mt-4 sm:mt-0">
          <span className="text-blue-300">Matches:</span> {matchedPairs}/{emojis.length}
        </div>
      </div>

      {gameComplete && (
        <div className="mb-6 text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          <h2 className="text-2xl font-bold text-blue-300 flex items-center justify-center">
            <Sparkles className="w-6 h-6 mr-2 text-yellow-300" />
            You Win!
            <Sparkles className="w-6 h-6 ml-2 text-yellow-300" />
          </h2>
          <p className="text-blue-200">Completed in {moves} moves</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-3xl">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            emoji={card.emoji}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

