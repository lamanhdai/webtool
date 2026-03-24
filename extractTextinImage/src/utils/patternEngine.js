const INVALID_CHARS_REGEX = /[<>:"/\\|?*]/
const WINDOWS_RESERVED_NAMES = new Set([
  'CON',
  'PRN',
  'AUX',
  'NUL',
  'COM1',
  'COM2',
  'COM3',
  'COM4',
  'COM5',
  'COM6',
  'COM7',
  'COM8',
  'COM9',
  'LPT1',
  'LPT2',
  'LPT3',
  'LPT4',
  'LPT5',
  'LPT6',
  'LPT7',
  'LPT8',
  'LPT9',
])

const pad = (value, width) => String(value).padStart(Math.max(1, Number(width) || 1), '0')

const formatDate = (timestamp, format) => {
  const d = new Date(timestamp)
  const parts = {
    YYYY: d.getFullYear(),
    MM: pad(d.getMonth() + 1, 2),
    DD: pad(d.getDate(), 2),
    HH: pad(d.getHours(), 2),
    mm: pad(d.getMinutes(), 2),
    ss: pad(d.getSeconds(), 2),
  }

  return (format || 'YYYY-MM-DD').replace(/YYYY|MM|DD|HH|mm|ss/g, (token) => parts[token])
}

const ensureExtension = (name, ext) => {
  if (!ext) return name
  const lower = name.toLowerCase()
  const wanted = `.${ext.toLowerCase()}`
  if (lower.endsWith(wanted)) return name
  return `${name}.${ext}`
}

export const parsePattern = (pattern, file, index, options) => {
  const raw = (pattern || '{index}_{original}').replace(
    /\{(index|folder|original|ext|date)\}/g,
    (_, token) => {
      if (token === 'index') return pad(index, options.padding)
      if (token === 'folder') return file.folder || 'root'
      if (token === 'original') return file.name
      if (token === 'ext') return file.ext
      if (token === 'date') return formatDate(file.lastModified, options.dateFormat)
      return ''
    },
  )

  const normalized = raw.trim().replace(/\s+/g, ' ')
  return ensureExtension(normalized, file.ext)
}

const compareText = (a, b, dir = 'asc') => {
  const val = a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  return dir === 'desc' ? -val : val
}

export const sortFiles = (files, settings) => {
  const sorted = [...files]
  const { sortBy, sortDir } = settings

  sorted.sort((a, b) => {
    if (sortBy === 'date') {
      const delta = a.lastModified - b.lastModified
      return sortDir === 'desc' ? -delta : delta
    }

    if (sortBy === 'folder') {
      const folderComp = compareText(a.folderPath, b.folderPath, sortDir)
      if (folderComp !== 0) return folderComp
      return compareText(a.name, b.name, sortDir)
    }

    const nameComp = compareText(a.name, b.name, sortDir)
    if (nameComp !== 0) return nameComp
    return compareText(a.folderPath, b.folderPath, sortDir)
  })

  return sorted
}

export const validateName = (name) => {
  if (!name || !name.trim()) return 'Name is empty'
  if (name === '.' || name === '..') return 'Name cannot be dot-only'
  if ([...name].some((ch) => ch.charCodeAt(0) < 32)) return 'Contains invalid control characters'
  if (INVALID_CHARS_REGEX.test(name)) return 'Contains invalid filename characters'
  if (/[. ]$/.test(name)) return 'Cannot end with dot or space'

  const baseUpper = (name.split('.').shift() || '').toUpperCase()
  if (WINDOWS_RESERVED_NAMES.has(baseUpper)) return 'Windows reserved filename'

  return ''
}

export const buildPreviewRows = (files, pattern, settings, manualNames = {}) => {
  const sorted = sortFiles(files, settings)
  const start = Number(settings.startIndex) || 1
  const byPath = new Map()

  const rows = sorted.map((file, i) => {
    const index = start + i
    const generated = parsePattern(pattern, file, index, settings)
    const manual = manualNames[file.id]
    const newName = (manual ?? generated).trim()
    const key = `${file.folderPath}/${newName}`
    const prior = byPath.get(key) || 0
    byPath.set(key, prior + 1)

    return {
      id: file.id,
      index,
      file,
      originalName: `${file.name}${file.ext ? `.${file.ext}` : ''}`,
      newName,
      folderPath: file.folderPath,
      status: 'ok',
      reason: '',
    }
  })

  return rows.map((row) => {
    const duplicateKey = `${row.folderPath}/${row.newName}`
    const duplicateCount = byPath.get(duplicateKey) || 0
    const invalidReason = validateName(row.newName)

    if (invalidReason) {
      return { ...row, status: 'invalid', reason: invalidReason }
    }

    if (duplicateCount > 1) {
      return { ...row, status: 'duplicate', reason: 'Duplicate filename in same folder' }
    }

    return row
  })
}
