import { useState } from 'react';
import { Upload, Download, X } from 'lucide-react';

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (!image) return;

    setIsProcessing(true);

    // Create an image element
    const img = new Image();
    img.src = image;

    img.onload = () => {
      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Remove white background (and near-white pixels)
      const threshold = 240; // Adjust this to be more/less aggressive
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        // If pixel is close to white, make it transparent
        if (red > threshold && green > threshold && blue > threshold) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }

      // Put the modified image data back
      ctx.putImageData(imageData, 0, 0);

      // Convert to PNG with transparency
      const transparentImage = canvas.toDataURL('image/png');
      setProcessedImage(transparentImage);
      setIsProcessing(false);
    };
  };

  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'background-removed.png';
    link.click();
  };

  const reset = () => {
    setImage(null);
    setProcessedImage(null);
  };

  return (
    <div className="size-full bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="mb-8 text-center">Background Remover</h1>

        {!image ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="mb-4 text-gray-600">Upload an image to remove its background</p>
            <label className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2>Preview</h2>
              <button
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-2 text-sm text-gray-600">Original</p>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-100">
                  <img src={image} alt="Original" className="w-full h-auto" />
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-600">Processed</p>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-transparent"
                     style={{
                       backgroundImage: 'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)',
                       backgroundSize: '20px 20px',
                       backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                     }}>
                  {processedImage ? (
                    <img src={processedImage} alt="Processed" className="w-full h-auto" />
                  ) : (
                    <div className="w-full aspect-video flex items-center justify-center text-gray-400">
                      No background removed yet
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={removeBackground}
                disabled={isProcessing}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Remove Background'}
              </button>

              {processedImage && (
                <button
                  onClick={downloadImage}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              )}
            </div>

            <p className="text-xs text-gray-500 text-center">
              Note: This is a demo interface. To enable actual background removal, integrate with an API like remove.bg by adding your API key.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}