export function formatTimestamp(secondsInput) {
  const safeSeconds = Math.max(0, Number(secondsInput) || 0)
  const totalMs = Math.floor(safeSeconds * 1000)
  const hours = Math.floor(totalMs / 3600000)
  const minutes = Math.floor((totalMs % 3600000) / 60000)
  const seconds = Math.floor((totalMs % 60000) / 1000)
  const milliseconds = totalMs % 1000

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${String(milliseconds).padStart(3, '0')}`
}

function pad(value) {
  return String(value).padStart(2, '0')
}
