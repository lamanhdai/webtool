# Image OCR + Object Detection Web App

Client-first React app for:

- Uploading an image
- Drawing/moving/resizing a region selection
- Running OCR on only the selected region (Tesseract.js)
- Running object detection on only the selected region (TensorFlow.js + COCO-SSD)
- Visualizing OCR text and object bounding boxes

## Tech Stack

- React + Vite
- TailwindCSS
- Zustand
- Tesseract.js
- TensorFlow.js + COCO-SSD

## Project Structure

```txt
src/
  components/
  features/
    image-upload/
    region-selector/
    ocr/
    object-detection/
    results/
  store/
  utils/
```

## Run Locally

```bash
npm install
npm run dev
```

Build and lint:

```bash
npm run lint
npm run build
```

## Usage Flow

1. Upload an image via browse or drag/drop.
2. Draw a selection on the image (or move/resize it).
3. Click **Analyze Selected Region**.
4. Review:
   - OCR text + confidence
   - Detected objects + confidences
   - Bounding boxes overlay on the image
5. Optional actions:
   - Toggle object overlay visibility
   - Copy OCR text
   - Download analysis JSON
   - Re-select and re-analyze

## Notes

- OCR language options include `eng`, `tha`, and `eng+tha`.
- Models are lazy-loaded (only loaded when analysis is run).
- Detection boxes are projected from the cropped region back to full-image coordinates.
