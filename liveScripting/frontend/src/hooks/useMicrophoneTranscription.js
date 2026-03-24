import { useCallback, useRef } from 'react';
import { transcribeStreamChunk } from '../api/transcriptionApi';
import { useTranscriptionStore } from '../store/useTranscriptionStore';

export function useMicrophoneTranscription() {
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);
  const chunkIndexRef = useRef(0);
  const queueRef = useRef(Promise.resolve());

  const {
    isRecording,
    targetLanguage,
    setRecording,
    setProcessing,
    appendStreamResult,
    setError,
    setInterimText,
    appendManualText,
  } = useTranscriptionStore();

  const enqueueChunk = useCallback(
    (blob) => {
      const chunkId = ++chunkIndexRef.current;
      queueRef.current = queueRef.current
        .catch(() => {})
        .then(async () => {
          setProcessing(true);
          setInterimText('Transcribing live audio...');
          const result = await transcribeStreamChunk({
            blob,
            targetLanguage,
            chunkId,
          });
          appendStreamResult(result);
          setProcessing(false);
        })
        .catch((error) => {
          setProcessing(false);
          setInterimText('');
          setError(error.message || 'Live transcription failed.');
        });
    },
    [appendStreamResult, setError, setInterimText, setProcessing, targetLanguage],
  );

  const stopTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const stop = useCallback(() => {
    setRecording(false);
    setInterimText('');

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (recorderRef.current) {
      if (recorderRef.current.state !== 'inactive') {
        recorderRef.current.stop();
      }
      recorderRef.current = null;
    }
    stopTracks();
  }, [setInterimText, setRecording]);

  const startBrowserSpeechFallback = useCallback(async () => {
    const RecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!RecognitionCtor) {
      throw new Error('Your browser does not support MediaRecorder or SpeechRecognition fallback.');
    }

    const recognition = new RecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const segment = event.results[i];
        const text = segment[0]?.transcript || '';
        if (segment.isFinal) {
          appendManualText(text);
        } else {
          interim += text;
        }
      }
      setInterimText(interim);
    };

    recognition.onerror = (event) => {
      setError(`Web Speech API error: ${event.error}`);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
  }, [appendManualText, setError, setInterimText, setRecording]);

  const start = useCallback(async () => {
    setError('');
    chunkIndexRef.current = 0;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      if (!window.MediaRecorder) {
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        await startBrowserSpeechFallback();
        return;
      }

      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      recorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          enqueueChunk(event.data);
        }
      };

      recorder.onerror = (event) => {
        setError(event.error?.message || 'Microphone recording failed.');
        stop();
      };

      recorder.start(3000);
      setRecording(true);
    } catch (error) {
      setError(error.message || 'Microphone permission denied or unavailable.');
      await startBrowserSpeechFallback().catch(() => {});
    }
  }, [enqueueChunk, setError, setRecording, startBrowserSpeechFallback, stop]);

  return {
    isRecording,
    start,
    stop,
  };
}
