import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env.js';

cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
  secure: true,
});

function normalizeResource(resource) {
  return {
    public_id: resource.public_id,
    format: resource.format || 'JPG',
    created_at: resource.created_at,
    updated_at: resource.updated_at || resource.created_at,
  };
}

export async function fetchAllCloudinaryImages() {
  const maxResults = 500;
  let nextCursor;
  const all = [];

  do {
    const response = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      max_results: maxResults,
      prefix: env.cloudinary.folder || undefined,
      next_cursor: nextCursor,
      direction: 'desc',
    });

    const resources = response.resources || [];
    all.push(...resources.map(normalizeResource));
    nextCursor = response.next_cursor;
  } while (nextCursor);
  return all;
}

export function buildSignedImageUrl(publicId, format = 'jpg') {
  const expiresAt = Math.floor(Date.now() / 1000) + env.cloudinary.signedUrlTtlSeconds;

  return cloudinary.url(publicId, {
    resource_type: 'image',
    type: 'authenticated',
    format,
    secure: true,
    sign_url: true,
    expires_at: expiresAt,
  });
}

export function placeholderDataUrl() {
  return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWYyOTM3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTRhM2I4IiBmb250LXNpemU9IjE4Ij5Mb2NrZWQgSW1hZ2U8L3RleHQ+PC9zdmc+';
}
