import JSZip from 'jszip'

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export const exportAsZip = async (rows) => {
  const zip = new JSZip()

  for (const row of rows) {
    const targetPath = row.folderPath ? `${row.folderPath}/${row.newName}` : row.newName
    zip.file(targetPath, row.file.file)
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  downloadBlob(blob, 'renamed-files.zip')
}

const quoteBat = (value) => `"${String(value).replace(/"/g, '""')}"`
const quoteSh = (value) => `'${String(value).replace(/'/g, `'"'"'`)}'`

export const exportRenameScript = (rows, type = 'bat') => {
  if (type === 'bat') {
    const lines = [
      '@echo off',
      'setlocal enabledelayedexpansion',
      '',
      'REM Run this script from the selected root directory.',
      '',
    ]

    for (const row of rows) {
      const fromPath = row.file.path.replace(/\//g, '\\')
      const toPath = row.folderPath
        ? `${row.folderPath}/${row.newName}`.replace(/\//g, '\\')
        : row.newName

      lines.push(`if exist ${quoteBat(fromPath)} ren ${quoteBat(fromPath)} ${quoteBat(row.newName)}`)

      if (fromPath !== toPath) {
        lines.push(`REM If folder changes are needed, move manually: ${quoteBat(fromPath)} -> ${quoteBat(toPath)}`)
      }
    }

    lines.push('', 'echo Done.', 'endlocal')
    downloadBlob(new Blob([lines.join('\r\n')], { type: 'text/plain;charset=utf-8' }), 'rename-files.bat')
    return
  }

  const lines = ['#!/usr/bin/env bash', 'set -euo pipefail', '', '# Run from selected root directory', '']

  for (const row of rows) {
    const fromPath = row.file.path
    const toPath = row.folderPath ? `${row.folderPath}/${row.newName}` : row.newName
    const toDir = row.folderPath || '.'

    lines.push(`mkdir -p ${quoteSh(toDir)}`)
    lines.push(`mv -n ${quoteSh(fromPath)} ${quoteSh(toPath)}`)
  }

  downloadBlob(new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }), 'rename-files.sh')
}
