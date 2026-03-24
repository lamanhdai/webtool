import { formatTimestamp } from './time.js'

export function segmentsToVtt(segments) {
  const lines = ['WEBVTT', '']

  segments.forEach((segment, index) => {
    lines.push(String(index + 1))
    lines.push(
      `${formatTimestamp(segment.start)} --> ${formatTimestamp(segment.end)}`,
    )
    lines.push((segment.text || '').trim())
    lines.push('')
  })

  return `${lines.join('\n')}\n`
}
