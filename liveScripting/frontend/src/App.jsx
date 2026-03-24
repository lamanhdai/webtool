import { useMemo } from 'react';
import { transcribeFile } from './api/transcriptionApi';
import ExportButtons from './components/ExportButtons';
import FileUploadPanel from './components/FileUploadPanel';
import MetadataPanel from './components/MetadataPanel';
import MicControls from './components/MicControls';
import ModeSwitcher from './components/ModeSwitcher';
import TranscriptPanel from './components/TranscriptPanel';
import TranslationSelect from './components/TranslationSelect';
import { useMicrophoneTranscription } from './hooks/useMicrophoneTranscription';
import { useTranscriptionStore } from './store/useTranscriptionStore';
import { exportAsSrt, exportAsTxt } from './utils/exportTranscript';

export default function App() {
  const {
    mode,
    transcript,
    translatedText,
    segments,
    language,
    isProcessing,
    isRecording,
    uploadProgress,
    error,
    targetLanguage,
    duration,
    confidence,
    interimText,
    setMode,
    setTargetLanguage,
    setProcessing,
    setUploadProgress,
    setError,
    resetOutput,
    setFileResult,
  } = useTranscriptionStore();

  const { start, stop } = useMicrophoneTranscription();

  const canExport = useMemo(() => transcript.trim().length > 0, [transcript]);

  const handleFileUpload = async (file) => {
    try {
      setError('');
      resetOutput();
      setProcessing(true);

      const result = await transcribeFile({
        file,
        targetLanguage,
        onProgress: setUploadProgress,
      });

      setFileResult(result);
      setUploadProgress(100);
    } catch (err) {
      setError(err.message || 'Failed to transcribe uploaded audio.');
    } finally {
      setProcessing(false);
      setTimeout(() => setUploadProgress(0), 500);
    }
  };

  const handleModeChange = (nextMode) => {
    if (isRecording) {
      stop();
    }
    setMode(nextMode);
    resetOutput();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-4 py-6 text-slate-100 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-400">Live Scripting • AI Speech-to-Text</p>
          <h1 className="text-2xl font-semibold md:text-3xl">Real-time + File Transcription with Auto Language Detection</h1>
          <p className="text-sm text-slate-400">
            Supports English, Vietnamese, Japanese, and multilingual audio via Whisper backend.
          </p>
        </header>

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
          <ModeSwitcher mode={mode} onChange={handleModeChange} />
          <div className="flex items-center gap-3">
            <TranslationSelect value={targetLanguage} onChange={setTargetLanguage} />
            <ExportButtons
              disabled={!canExport}
              onExportTxt={() => exportAsTxt(transcript)}
              onExportSrt={() => exportAsSrt(segments)}
            />
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            {mode === 'mic' ? (
              <MicControls isRecording={isRecording} isProcessing={isProcessing} onStart={start} onStop={stop} />
            ) : (
              <FileUploadPanel isProcessing={isProcessing} onSelectFile={handleFileUpload} />
            )}

            <TranscriptPanel
              transcript={transcript}
              translatedText={translatedText}
              interimText={interimText}
              isProcessing={isProcessing}
            />
          </div>

          <MetadataPanel
            language={language}
            duration={duration}
            confidence={confidence}
            segmentsCount={segments.length}
            uploadProgress={uploadProgress}
            error={error}
          />
        </div>
      </div>
    </main>
  );
}
