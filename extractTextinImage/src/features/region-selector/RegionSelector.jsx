import { useEffect, useMemo, useRef, useState } from 'react'

const HANDLE_SIZE = 10

export function RegionSelector({
  imageUrl,
  selection,
  detections,
  showDetections,
  loading,
  onSelectionChange,
  onImageMetaChange,
  onImageElementReady,
}) {
  const wrapperRef = useRef(null)
  const imgRef = useRef(null)
  const interactionRef = useRef(null)
  const [displayRect, setDisplayRect] = useState(null)

  const hasImage = Boolean(imageUrl)

  const selectionInView = useMemo(() => {
    if (!selection || !displayRect) {
      return null
    }
    const scaleX = displayRect.width / displayRect.naturalWidth
    const scaleY = displayRect.height / displayRect.naturalHeight

    return {
      x: selection.x * scaleX,
      y: selection.y * scaleY,
      width: selection.width * scaleX,
      height: selection.height * scaleY,
    }
  }, [displayRect, selection])

  useEffect(() => {
    if (!imgRef.current) {
      return
    }

    const updateRect = () => {
      if (!imgRef.current) {
        return
      }

      const rendered = imgRef.current.getBoundingClientRect()
      const meta = {
        naturalWidth: imgRef.current.naturalWidth,
        naturalHeight: imgRef.current.naturalHeight,
        width: rendered.width,
        height: rendered.height,
      }

      setDisplayRect(meta)
      onImageMetaChange(meta)
      onImageElementReady?.(imgRef.current)
    }

    updateRect()
    window.addEventListener('resize', updateRect)
    const resizeObserver = new ResizeObserver(updateRect)
    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current)
    }

    return () => {
      window.removeEventListener('resize', updateRect)
      resizeObserver.disconnect()
    }
  }, [imageUrl, onImageElementReady, onImageMetaChange])

  const beginInteraction = (event) => {
    if (!displayRect || !imgRef.current) {
      return
    }

    const point = getPointOnImage(event, imgRef.current)
    const currentViewSelection = selectionInView
    const handle = currentViewSelection ? getResizeHandle(point, currentViewSelection) : ''
    const isInside = currentViewSelection ? isPointInsideRect(point, currentViewSelection) : false

    let mode = 'draw'
    if (handle) {
      mode = 'resize'
    } else if (isInside) {
      mode = 'move'
    }

    interactionRef.current = {
      mode,
      start: point,
      initialSelection: currentViewSelection,
      handle,
    }

    if (mode === 'draw') {
      onSelectionChange(
        viewRectToNatural(
          {
            x: point.x,
            y: point.y,
            width: 1,
            height: 1,
          },
          displayRect,
        ),
      )
    }

    const onMove = (moveEvent) => {
      if (!interactionRef.current || !displayRect || !imgRef.current) {
        return
      }

      const nextPoint = getPointOnImage(moveEvent, imgRef.current)
      const nextRect = computeNextRect(interactionRef.current, nextPoint, displayRect)
      if (!nextRect) {
        return
      }

      onSelectionChange(viewRectToNatural(nextRect, displayRect))
    }

    const onUp = () => {
      interactionRef.current = null
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <div className="min-h-0 flex-1 rounded-lg border border-slate-800 bg-slate-950/50 p-2">
      {!hasImage ? (
        <div className="grid h-full min-h-[380px] place-items-center rounded border border-dashed border-slate-700 text-sm text-slate-400">
          Upload an image to begin region selection.
        </div>
      ) : (
        <div ref={wrapperRef} className="relative mx-auto w-full max-w-full overflow-auto">
          <div className="relative inline-block select-none" onPointerDown={beginInteraction}>
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Uploaded preview"
              className="max-h-[65vh] max-w-full rounded object-contain"
              onLoad={() => {
                if (!imgRef.current) {
                  return
                }
                const rendered = imgRef.current.getBoundingClientRect()
                const meta = {
                  naturalWidth: imgRef.current.naturalWidth,
                  naturalHeight: imgRef.current.naturalHeight,
                  width: rendered.width,
                  height: rendered.height,
                }
                setDisplayRect(meta)
                onImageMetaChange(meta)
                onImageElementReady?.(imgRef.current)
              }}
            />

            {selectionInView ? (
              <>
                <div
                  className="pointer-events-none absolute border-2 border-indigo-400 bg-indigo-400/15"
                  style={{
                    left: selectionInView.x,
                    top: selectionInView.y,
                    width: selectionInView.width,
                    height: selectionInView.height,
                  }}
                />

                {['nw', 'ne', 'sw', 'se'].map((handle) => {
                  const pos = getHandlePosition(handle, selectionInView)
                  return (
                    <div
                      key={handle}
                      className="pointer-events-none absolute rounded-sm border border-white bg-indigo-500"
                      style={{
                        left: pos.x - HANDLE_SIZE / 2,
                        top: pos.y - HANDLE_SIZE / 2,
                        width: HANDLE_SIZE,
                        height: HANDLE_SIZE,
                      }}
                    />
                  )
                })}
              </>
            ) : null}

            {showDetections && displayRect
              ? detections.map((item, index) => {
                  const scaleX = displayRect.width / displayRect.naturalWidth
                  const scaleY = displayRect.height / displayRect.naturalHeight
                  const [x, y, width, height] = item.bbox
                  return (
                    <div
                      key={`${item.label}-${index}`}
                      className="pointer-events-none absolute border border-emerald-400 bg-emerald-500/10"
                      style={{
                        left: x * scaleX,
                        top: y * scaleY,
                        width: width * scaleX,
                        height: height * scaleY,
                      }}
                    >
                      <span className="absolute -top-6 left-0 rounded bg-emerald-500 px-1.5 py-0.5 text-[10px] font-semibold text-slate-950">
                        {item.label} {(item.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  )
                })
              : null}

            {loading ? (
              <div className="pointer-events-none absolute inset-0 grid place-items-center rounded bg-slate-950/45">
                <p className="rounded bg-slate-900/80 px-3 py-2 text-xs text-slate-200">
                  Running OCR + detection…
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {selection ? (
        <p className="mt-2 text-xs text-slate-300">
          Selection: x={Math.round(selection.x)}, y={Math.round(selection.y)}, w=
          {Math.round(selection.width)}, h={Math.round(selection.height)}
        </p>
      ) : null}
    </div>
  )
}

function getPointOnImage(event, imageElement) {
  const rect = imageElement.getBoundingClientRect()
  return {
    x: clamp(event.clientX - rect.left, 0, rect.width),
    y: clamp(event.clientY - rect.top, 0, rect.height),
  }
}

function computeNextRect(interaction, nextPoint, displayRect) {
  if (interaction.mode === 'draw') {
    return normalizeRect({
      x1: interaction.start.x,
      y1: interaction.start.y,
      x2: nextPoint.x,
      y2: nextPoint.y,
    })
  }

  if (!interaction.initialSelection) {
    return null
  }

  if (interaction.mode === 'move') {
    const dx = nextPoint.x - interaction.start.x
    const dy = nextPoint.y - interaction.start.y

    return clampRectToBounds(
      {
        x: interaction.initialSelection.x + dx,
        y: interaction.initialSelection.y + dy,
        width: interaction.initialSelection.width,
        height: interaction.initialSelection.height,
      },
      displayRect,
    )
  }

  if (interaction.mode === 'resize') {
    const base = interaction.initialSelection
    const corners = {
      nw: { x: base.x + base.width, y: base.y + base.height },
      ne: { x: base.x, y: base.y + base.height },
      sw: { x: base.x + base.width, y: base.y },
      se: { x: base.x, y: base.y },
    }

    const fixedCorner = corners[interaction.handle] || corners.se
    return clampRectToBounds(
      normalizeRect({
        x1: fixedCorner.x,
        y1: fixedCorner.y,
        x2: nextPoint.x,
        y2: nextPoint.y,
      }),
      displayRect,
    )
  }

  return null
}

function viewRectToNatural(rect, displayRect) {
  const scaleX = displayRect.naturalWidth / displayRect.width
  const scaleY = displayRect.naturalHeight / displayRect.height

  return {
    x: Math.round(rect.x * scaleX),
    y: Math.round(rect.y * scaleY),
    width: Math.max(1, Math.round(rect.width * scaleX)),
    height: Math.max(1, Math.round(rect.height * scaleY)),
  }
}

function getResizeHandle(point, selection) {
  const handles = ['nw', 'ne', 'sw', 'se']
  for (const handle of handles) {
    const pos = getHandlePosition(handle, selection)
    if (
      Math.abs(point.x - pos.x) <= HANDLE_SIZE &&
      Math.abs(point.y - pos.y) <= HANDLE_SIZE
    ) {
      return handle
    }
  }
  return ''
}

function getHandlePosition(handle, selection) {
  if (handle === 'nw') {
    return { x: selection.x, y: selection.y }
  }
  if (handle === 'ne') {
    return { x: selection.x + selection.width, y: selection.y }
  }
  if (handle === 'sw') {
    return { x: selection.x, y: selection.y + selection.height }
  }
  return { x: selection.x + selection.width, y: selection.y + selection.height }
}

function isPointInsideRect(point, rect) {
  return (
    point.x >= rect.x &&
    point.y >= rect.y &&
    point.x <= rect.x + rect.width &&
    point.y <= rect.y + rect.height
  )
}

function normalizeRect({ x1, y1, x2, y2 }) {
  const x = Math.min(x1, x2)
  const y = Math.min(y1, y2)
  const width = Math.abs(x2 - x1)
  const height = Math.abs(y2 - y1)
  return {
    x,
    y,
    width,
    height,
  }
}

function clampRectToBounds(rect, bounds) {
  const width = Math.max(1, Math.min(rect.width, bounds.width))
  const height = Math.max(1, Math.min(rect.height, bounds.height))
  const x = clamp(rect.x, 0, bounds.width - width)
  const y = clamp(rect.y, 0, bounds.height - height)

  return { x, y, width, height }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}
