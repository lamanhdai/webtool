import fs from 'node:fs'
import path from 'node:path'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { env } from '../config/env.js'

let db

const seedVideos = [
  {
    id: 'video-01',
    title: 'Skyline Pursuit 01',
    year: 2020,
    category: 'action',
    thumbnail: 'https://picsum.photos/seed/video-01/640/360',
    video_url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'High-energy mission footage featuring tactical maneuvers and explosive moments.',
  },
  {
    id: 'video-02',
    title: 'Midnight Echo 02',
    year: 2021,
    category: 'horror',
    thumbnail: 'https://picsum.photos/seed/video-02/640/360',
    video_url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    description: 'Atmospheric thriller sequence with suspenseful audio cues and eerie storytelling.',
  },
  {
    id: 'video-03',
    title: 'Pixel Pals 03',
    year: 2022,
    category: 'cartoon',
    thumbnail: 'https://picsum.photos/seed/video-03/640/360',
    video_url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'Colorful animated short with playful characters and family-friendly adventure.',
  },
]

export async function initDb() {
  if (db) return db

  const dbPath = path.resolve(process.cwd(), env.databasePath)
  const dir = path.dirname(dbPath)
  fs.mkdirSync(dir, { recursive: true })

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  })

  await db.exec('PRAGMA foreign_keys = ON;')

  await db.exec(`
    CREATE TABLE IF NOT EXISTS videos (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      year INTEGER NOT NULL,
      category TEXT NOT NULL,
      thumbnail TEXT NOT NULL,
      video_url TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_videos_year ON videos(year);
    CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
    CREATE INDEX IF NOT EXISTS idx_videos_title ON videos(title);
  `)

  const row = await db.get('SELECT COUNT(*) as total FROM videos')
  if (Number(row?.total || 0) === 0) {
    for (const video of seedVideos) {
      await db.run(
        `INSERT INTO videos (id, title, year, category, thumbnail, video_url, description)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        video.id,
        video.title,
        video.year,
        video.category,
        video.thumbnail,
        video.video_url,
        video.description,
      )
    }
  }

  return db
}

export function getDb() {
  if (!db) throw new Error('Database not initialized')
  return db
}
