import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'

export default function AudioIntro() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    playing ? audio.play() : audio.pause()
  }, [playing])

  return (
    <div className="mt-6 flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl p-3 w-full max-w-md">
      <button
        onClick={() => setPlaying(p => !p)}
        className="h-10 w-10 rounded-lg bg-white/20 text-white flex items-center justify-center"
        aria-label={playing ? 'Pause audio' : 'Play audio'}
      >
        {playing ? <Pause size={18}/> : <Play size={18}/>} 
      </button>
      <div className="text-white/80 text-sm leading-snug">
        Audio intro: Discover how SupplyLink empowers retailers and suppliers with seamless ordering and collaboration.
      </div>
      <Volume2 className="text-white/60 ml-auto" size={18}/>
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_0a8ad38bb2.mp3?filename=inspiring-ambient-112199.mp3" preload="auto" />
    </div>
  )
}
