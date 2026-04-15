import { useDeferredValue, useEffect, useRef, useState } from "react";
import EditorPanel from "./components/EditorPanel";
import TerminalCanvas from "./components/TerminalCanvas";
import { usePreviewScale } from "./hooks/usePreviewScale";
import { useTruncatedConversation } from "./hooks/useTruncatedConversation";
import { DEFAULTS, EXPORT_SIZE } from "./lib/defaults";
import { exportCanvas } from "./lib/exportCanvas";

export default function App() {
  const [state, setState] = useState(() => ({ ...DEFAULTS }));
  const [showToast, setShowToast] = useState(false);
  const exportFrameRef = useRef(null);
  const exportTerminalWindowRef = useRef(null);
  const previewRef = useRef(null);
  const toastTimerRef = useRef(null);
  const scale = usePreviewScale(previewRef);
  const deferredUserText = useDeferredValue(state.userText);
  const deferredClaudeText = useDeferredValue(state.claudeText);
  const truncatedText = useTruncatedConversation({
    userText: deferredUserText,
    claudeText: deferredClaudeText,
    fontSize: state.fontSize,
  });
  const canvasState = {
    ...state,
    userText: truncatedText.userText,
    claudeText: truncatedText.claudeText,
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  async function handleDownload() {
    try {
      const didExport = await exportCanvas({
        frameEl: exportFrameRef.current,
        terminalWindowEl: exportTerminalWindowRef.current,
        theme: state.theme,
      });

      if (!didExport) return;

      setShowToast(true);
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }

      toastTimerRef.current = window.setTimeout(() => {
        setShowToast(false);
      }, 2200);
    } catch (error) {
      window.alert(`Export failed: ${error.message}`);
    }
  }

  function handleReset() {
    setState({ ...DEFAULTS });
  }

  function handleFieldChange(field, value) {
    setState((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <>
      <div className="app-shell">
        <EditorPanel
          state={state}
          onChange={handleFieldChange}
          onDownload={handleDownload}
          onReset={handleReset}
        />

        <main className="preview-panel">
          <div className="preview-stage" ref={previewRef}>
            <div
              className="preview-frame"
              style={{
                width: `${EXPORT_SIZE * scale}px`,
                height: `${EXPORT_SIZE * scale}px`,
              }}
            >
              <div className="preview-scaler" style={{ transform: `scale(${scale})` }}>
                <TerminalCanvas {...canvasState} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="export-root" aria-hidden="true">
        <TerminalCanvas
          {...canvasState}
          frameRef={exportFrameRef}
          terminalWindowRef={exportTerminalWindowRef}
        />
      </div>

      <div className={`toast ${showToast ? "show" : ""}`}>
        export ready. post the evidence.
      </div>
    </>
  );
}
