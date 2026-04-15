import AutoResizeTextarea from "./AutoResizeTextarea";

export default function EditorPanel({ state, onChange, onDownload, onReset }) {
  return (
    <aside className="editor-panel">
      <div className="brand">
        <div className="logo">
          claude<span>cooked</span>
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
