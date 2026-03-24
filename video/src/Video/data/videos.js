const categories = ['action', 'horror', 'cartoon']
const baseTitles = {
  action: ['Skyline Pursuit', 'Iron Resolve', 'Last Operator', 'Rapid Strike'],
  horror: ['Midnight Echo', 'Crimson Corridor', 'Silent Basement', 'The Last Candle'],
  cartoon: ['Pixel Pals', 'Sunny Forest', 'Rocket Raccoon Crew', 'Candy Planet'],
}

const descriptions = {
  action:
    'High-energy mission footage featuring tactical maneuvers, fast pacing, and explosive moments.',
  horror:
    'Atmospheric thriller sequence with moody lighting, suspenseful audio cues, and eerie storytelling.',
  cartoon:
    'Colorful animated short with playful characters, uplifting scenes, and family-friendly adventure.',
}

export const videos = Array.from({ length: 60 }, (_, index) => {
  const category = categories[index % categories.length]
  const year = 2012 + (index % 13)
  const titleBase = baseTitles[category][index % baseTitles[category].length]
  const sequence = String(index + 1).padStart(2, '0')

  return {
    id: `video-${sequence}`,
    title: `${titleBase} ${sequence}`,
    year,
    category,
    thumbnail: `https://picsum.photos/seed/video-${sequence}/640/360`,
    videoUrl:
      index % 2 === 0
        ? 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
        : 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    description: descriptions[category],
  }
})
