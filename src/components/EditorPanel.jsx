import AutoResizeTextarea from "./AutoResizeTextarea";

export default function EditorPanel({ state, onChange, onDownload, onReset }) {
  return (
    <aside className="editor-panel">
      <div className="brand">
        <div className="brand-head">
          <div className="logo">
            claude<span>cooked</span>
          </div>
          <a
            className="brand-link"
            href="https://www.instagram.com/claudecooked/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit @claudecooked on Instagram"
            title="@claudecooked on Instagram"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.93 1.35a1.07 1.07 0 1 1 0 2.14 1.07 1.07 0 0 1 0-2.14ZM12 6.86A5.14 5.14 0 1 1 6.86 12 5.15 5.15 0 0 1 12 6.86Zm0 1.8A3.34 3.34 0 1 0 15.34 12 3.35 3.35 0 0 0 12 8.66Z" />
            </svg>
          </a>
        </div>
        <p className="subcopy">git blame claude</p>
      </div>

      <section className="editor-card">
        <div className="editor-section">
          <label className="editor-label" htmlFor="user-text">
            Your prompt
          </label>
          <AutoResizeTextarea
            id="user-text"
            className="editor-textarea"
            value={state.userText}
            onChange={(event) => onChange("userText", event.target.value)}
            placeholder="type the request..."
          />
        </div>

        <div className="editor-section">
          <label className="editor-label" htmlFor="claude-text">
            Claude's response
          </label>
          <AutoResizeTextarea
            id="claude-text"
            className="editor-textarea"
            value={state.claudeText}
            onChange={(event) => onChange("claudeText", event.target.value)}
            placeholder="type the response..."
          />
        </div>

        <div className="editor-section">
          <label className="editor-label" htmlFor="composer-text">
            Composer input
          </label>
          <AutoResizeTextarea
            id="composer-text"
            className="editor-textarea"
            value={state.composerText}
            onChange={(event) => onChange("composerText", event.target.value)}
            placeholder="leave empty for an idle caret..."
          />
        </div>
      </section>

      <section className="editor-card">
        <div className="settings-grid">
          <div className="setting-row">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              className="editor-input"
              value={state.theme}
              onChange={(event) => onChange("theme", event.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="setting-row">
            <label htmlFor="title-text">Window title</label>
            <input
              id="title-text"
              className="editor-input"
              type="text"
              value={state.titleText}
              onChange={(event) => onChange("titleText", event.target.value)}
            />
          </div>

          <div className="setting-row">
            <label htmlFor="left-side-text">Left side text</label>
            <input
              id="left-side-text"
              className="editor-input"
              type="text"
              value={state.leftSideText}
              onChange={(event) => onChange("leftSideText", event.target.value)}
            />
          </div>

          <div className="setting-row">
            <label htmlFor="right-side-text">Right side text</label>
            <input
              id="right-side-text"
              className="editor-input"
              type="text"
              value={state.watermarkText}
              onChange={(event) => onChange("watermarkText", event.target.value)}
            />
          </div>
        </div>

        <div className="setting-row">
          <label htmlFor="font-size">Type size</label>
          <div className="range-wrap">
            <input
              id="font-size"
              type="range"
              min="20"
              max="36"
              step="1"
              value={state.fontSize}
              onChange={(event) => onChange("fontSize", Number(event.target.value))}
            />
            <div className="slider-value">{state.fontSize}px</div>
          </div>
        </div>

        <div className="button-row">
          <button type="button" className="btn btn-primary" onClick={onDownload}>
            Download PNG
          </button>
          <button type="button" className="btn btn-secondary" onClick={onReset}>
            Reset
          </button>
        </div>
      </section>

      <p className="helper-text">
        The background stays square, while the terminal window sizes itself to the
        conversation.
      </p>
    </aside>
  );
}
