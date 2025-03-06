import MemoryGame from "@/components/memory-game"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-950">
      <div className="w-full max-w-4xl">
        <MemoryGame />
      </div>
    </main>
  )
}

