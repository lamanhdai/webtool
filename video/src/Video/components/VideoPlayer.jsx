import { useCallback, useEffect, useRef, useState } from 'react'

export function VideoPlayer({ src, poster, title }) {
  const videoRef = useRef(null)
  const fadeTimerRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [playbackRate, setPlaybackRate] = useState(1)

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) {
        window.clearInterval(fadeTimerRef.current)
      }
    }
  }, [])

  const syncState = useCallback(() => {
    if (!videoRef.current) return
    setIsPlaying(!videoRef.current.paused)
    setCurrentTime(videoRef.current.currentTime)
    setDuration(videoRef.current.duration || 0)
    setVolume(videoRef.current.volume)
    setPlaybackRate(videoRef.current.playbackRate)
  }, [])

  const handlePlay = useCallback(async () => {
    if (!videoRef.current) return
    await videoRef.current.play()
    syncState()
  }, [syncState])

  const handlePauseSmooth = useCallback(() => {
    if (!videoRef.current || videoRef.current.paused) return

    if (fadeTimerRef.current) {
      window.clearInterval(fadeTimerRef.current)
    }

    const player = videoRef.current
    const originalVolume = player.volume
    const steps = 7
    const interval = 35
    let currentStep = 0

    fadeTimerRef.current = window.setInterval(() => {
      currentStep += 1
      const nextVolume = Math.max(0, originalVolume * (1 - currentStep / steps))
      player.volume = nextVolume
      setVolume(nextVolume)

      if (currentStep >= steps) {
        window.clearInterval(fadeTimerRef.current)
        fadeTimerRef.current = null
        player.pause()
        player.volume = originalVolume
        setVolume(originalVolume)
        setIsPlaying(false)
      }
    }, interval)
  }, [])

  const handleStop = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
    syncState()
  }

  const seekBy = (seconds) => {
    if (!videoRef.current) return
    const next = Math.min(
      Math.max(videoRef.current.currentTime + seconds, 0),
      videoRef.current.duration || 0,
    )
    videoRef.current.currentTime = next
    setCurrentTime(next)
  }

  const changeVolume = (delta) => {
    if (!videoRef.current) return
    const next = clamp(videoRef.current.volume + delta, 0, 1)
    videoRef.current.volume = next
    setVolume(next)
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code !== 'Space') return
      const targetTag = event.target?.tagName?.toLowerCase()
      if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') return
      event.preventDefault()
      if (isPlaying) {
        handlePauseSmooth()
      } else {
        handlePlay()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isPlaying, handlePauseSmooth, handlePlay])

  return (
    <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="overflow-hidden rounded-lg border border-slate-800 bg-black">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="aspect-video w-full bg-black"
          onPlay={syncState}
          onPause={syncState}
          onLoadedMetadata={syncState}
          onTimeUpdate={syncState}
          onRateChange={syncState}
          onVolumeChange={syncState}
        />
      </div>

      <div className="space-y-3">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={(event) => {
            if (!videoRef.current) return
            const next = Number(event.target.value)
            videoRef.current.currentTime = next
            setCurrentTime(next)
          }}
          className="w-full accent-indigo-500"
          aria-label="Seek progress"
        />

        <div className="flex flex-wrap items-center gap-2">
          <ControlButton onClick={handlePlay}>▶ Play</ControlButton>
          <ControlButton onClick={handlePauseSmooth}>⏸ Pause</ControlButton>
          <ControlButton onClick={handleStop}>⏹ Stop</ControlButton>
          <ControlButton onClick={() => seekBy(-10)}>⏪ Back 10s</ControlButton>
          <ControlButton onClick={() => seekBy(10)}>⏩ Forward 10s</ControlButton>
          <ControlButton onClick={() => changeVolume(-0.1)}>🔉 Vol -</ControlButton>
          <ControlButton onClick={() => changeVolume(0.1)}>🔊 Vol +</ControlButton>

          <select
            value={playbackRate}
            onChange={(event) => {
              if (!videoRef.current) return
              const next = Number(event.target.value)
              videoRef.current.playbackRate = next
              setPlaybackRate(next)
            }}
            className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-100"
            aria-label="Playback speed"
          >
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
              <option key={speed} value={speed}>
                {speed}x
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
          <span>{title}</span>
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <span>Volume: {Math.round(volume * 100)}%</span>
        </div>

        <p className="text-[11px] text-slate-500">Tip: Press Space to toggle play/pause.</p>
      </div>
    </div>
  )
}

function ControlButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-indigo-500 hover:text-white"
    >
      {children}
    </button>
  )
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}
