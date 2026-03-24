import { create } from 'zustand';

const initialState = {
  mode: 'mic',
  transcript: '',
  translatedText: '',
  segments: [],
  language: 'unknown',
  isRecording: false,
  isProcessing: false,
  uploadProgress: 0,
  error: '',
  targetLanguage: 'none',
  duration: 0,
  confidence: null,
  interimText: '',
};

export const useTranscriptionStore = create((set, get) => ({
  ...initialState,

  setMode: (mode) => set({ mode }),
  setTargetLanguage: (targetLanguage) => set({ targetLanguage }),
  setRecording: (isRecording) => set({ isRecording }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setUploadProgress: (uploadProgress) => set({ uploadProgress }),
  setError: (error) => set({ error }),
  setInterimText: (interimText) => set({ interimText }),
  appendManualText: (text) => {
    const prev = get();
    const cleaned = text?.trim();
    if (!cleaned) return;
    set({
      transcript: [prev.transcript, cleaned].filter(Boolean).join(' ').trim(),
    });
  },

  resetOutput: () =>
    set({
      transcript: '',
      translatedText: '',
      segments: [],
      language: 'unknown',
      error: '',
      duration: 0,
      confidence: null,
      interimText: '',
      uploadProgress: 0,
    }),

  appendStreamResult: (result) => {
    const prev = get();
    const chunkText = result?.text?.trim() || '';
    const chunkTranslated = result?.translatedText?.trim() || '';
    const nextTranscript = [prev.transcript, chunkText].filter(Boolean).join(' ').trim();
    const nextTranslated = [prev.translatedText, chunkTranslated].filter(Boolean).join(' ').trim();
    const nextSegments = [...prev.segments, ...(result?.segments || [])];
    const nextDuration = Number(prev.duration || 0) + Number(result?.duration || 0);

    const confidenceParts = [prev.confidence, result?.confidence].filter((v) => typeof v === 'number');
    const nextConfidence = confidenceParts.length
      ? Number((confidenceParts.reduce((sum, v) => sum + v, 0) / confidenceParts.length).toFixed(3))
      : null;

    set({
      transcript: nextTranscript,
      translatedText: nextTranslated,
      language: result?.language || prev.language,
      segments: nextSegments,
      duration: nextDuration,
      confidence: nextConfidence,
      interimText: '',
    });
  },

  setFileResult: (result) =>
    set({
      transcript: result?.text || '',
      translatedText: result?.translatedText || '',
      segments: result?.segments || [],
      language: result?.language || 'unknown',
      duration: Number(result?.duration || 0),
      confidence: typeof result?.confidence === 'number' ? result.confidence : null,
      interimText: '',
    }),
}));
