const splitNameAndExt = (filename) => {
  const lastDot = filename.lastIndexOf('.')
  if (lastDot <= 0) return { name: filename, ext: '' }
  return {
    name: filename.slice(0, lastDot),
    ext: filename.slice(lastDot + 1),
  }
}

const normalizePath = (path) => path.replace(/\\/g, '/').replace(/^\/+/, '')

export const fileToRecord = (file, relativePath) => {
  const cleanPath = normalizePath(relativePath || file.webkitRelativePath || file.name)
  const parts = cleanPath.split('/')
  const filename = parts[parts.length - 1] || file.name
  const folderPath = parts.slice(0, -1).join('/')
  const folder = parts.length > 1 ? parts[parts.length - 2] : ''
  const { name, ext } = splitNameAndExt(filename)
  const id = `${cleanPath}__${file.size}__${file.lastModified}`

  return {
    id,
    file,
    name,
    ext,
    folder,
    folderPath,
    path: cleanPath,
    lastModified: file.lastModified,
    size: file.size,
  }
}

export const parseFileList = (fileList) => {
  const files = Array.from(fileList || [])
  return files.map((file) => fileToRecord(file, file.webkitRelativePath || file.name))
}

const walkEntry = async (entry, prefix = '') => {
  if (!entry) return []

  if (entry.isFile) {
    const file = await new Promise((resolve, reject) => {
      entry.file(resolve, reject)
    })
    const path = `${prefix}${entry.name}`
    return [fileToRecord(file, path)]
  }

  if (!entry.isDirectory) return []

  const reader = entry.createReader()
  const entries = []

  while (true) {
    const batch = await new Promise((resolve, reject) => {
      reader.readEntries(resolve, reject)
    })
    if (!batch.length) break
    entries.push(...batch)
  }

  const nested = await Promise.all(
    entries.map((child) => walkEntry(child, `${prefix}${entry.name}/`)),
  )

  return nested.flat()
}

export const parseDroppedItems = async (items) => {
  const entries = Array.from(items || [])
    .map((item) => item.webkitGetAsEntry?.())
    .filter(Boolean)

  if (!entries.length) return []

  const chunks = await Promise.all(entries.map((entry) => walkEntry(entry)))
  return chunks.flat()
}
