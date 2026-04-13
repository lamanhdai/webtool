import { getDb } from '../db/index.js'

const PAGE_SIZE = 20

function mapVideoRow(row) {
  return {
    id: row.id,
    title: row.title,
    year: Number(row.year),
    category: row.category,
    thumbnail: row.thumbnail,
    videoUrl: row.video_url,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function listVideos({ page = 1, search = '', year = '', category = '' }) {
  const db = getDb()
  const safePage = Math.max(1, Number(page) || 1)
  const offset = (safePage - 1) * PAGE_SIZE

  const where = []
  const params = []

  const searchText = String(search || '').trim()
  if (searchText) {
    where.push('LOWER(title) LIKE ?')
    params.push(`%${searchText.toLowerCase()}%`)
  }

  const safeYear = Number(year)
  if (!Number.isNaN(safeYear) && safeYear > 0) {
    where.push('year = ?')
    params.push(safeYear)
  }

  const categoryText = String(category || '').trim().toLowerCase()
  if (categoryText) {
    where.push('category = ?')
    params.push(categoryText)
  }

  const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : ''

  const rows = await db.all(
    `SELECT *
     FROM videos
     ${whereClause}
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    ...params,
    PAGE_SIZE,
    offset,
  )

  const totalRow = await db.get(
    `SELECT COUNT(*) as total
     FROM videos
     ${whereClause}`,
    ...params,
  )

  const total = Number(totalRow?.total || 0)
  return {
    data: rows.map(mapVideoRow),
    page: safePage,
    pageSize: PAGE_SIZE,
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
  }
}

export async function getVideoById(videoId) {
  const db = getDb()
  const row = await db.get('SELECT * FROM videos WHERE id = ?', videoId)
  return row ? mapVideoRow(row) : null
}

export async function createVideo(payload) {
  const db = getDb()
  const now = new Date().toISOString()
  await db.run(
    `INSERT INTO videos (id, title, year, category, thumbnail, video_url, description, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    payload.id,
    payload.title,
    payload.year,
    payload.category,
    payload.thumbnail,
    payload.videoUrl,
    payload.description,
    now,
    now,
  )

  return getVideoById(payload.id)
}

export async function updateVideo(videoId, payload) {
  const db = getDb()
  const existing = await getVideoById(videoId)
  if (!existing) return null

  const updated = {
    ...existing,
    ...payload,
  }

  await db.run(
    `UPDATE videos
     SET title = ?, year = ?, category = ?, thumbnail = ?, video_url = ?, description = ?, updated_at = ?
     WHERE id = ?`,
    updated.title,
    Number(updated.year),
    String(updated.category).toLowerCase(),
    updated.thumbnail,
    updated.videoUrl,
    updated.description,
    new Date().toISOString(),
    videoId,
  )

  return getVideoById(videoId)
}

export async function deleteVideo(videoId) {
  const db = getDb()
  const existing = await getVideoById(videoId)
  if (!existing) return false

  await db.run('DELETE FROM videos WHERE id = ?', videoId)
  return true
}
