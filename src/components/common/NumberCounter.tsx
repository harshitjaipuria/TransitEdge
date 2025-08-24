import React, { useState, useEffect } from 'react'

const UseNumberCounter: React.FC<{ start: number; end: number; duration: number }> = ({
  start,
  end,
  duration,
}) => {
  const [count, setCount] = useState(start)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const step = () => {
      const now = Date.now()
      const remaining = endTime - now

      if (remaining <= 0) {
        setCount(end)
      } else {
        const progress = 1 - remaining / duration
        const currentCount = Math.floor(progress * (end - start) + start)
        setCount(currentCount)
        requestAnimationFrame(step)
      }
    }

    // Start the animation
    const animationFrameId = requestAnimationFrame(step)

    // Cleanup function to cancel the animation frame if the component unmounts
    return () => cancelAnimationFrame(animationFrameId)
  }, [start, end, duration])

  return <span>{count}</span>
}

export default UseNumberCounter
