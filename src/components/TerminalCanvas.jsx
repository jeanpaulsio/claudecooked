import { EMPTY_TEXT } from "../lib/defaults";
import mascotSticker from "../../assets/mascot-sticker.png";

const USER_MARK = "\u276F";
const CLAUDE_MARK = "\u25CF";

function textOrPlaceholder(value) {
  return value || EMPTY_TEXT;
}

export default function TerminalCanvas({
  frameRef,
  terminalWindowRef,
  userText,
  claudeText,
  fontSize,
  theme,
  titleText,
  leftSideText,
  watermarkText,
}) {
  const fontSizeStyle = { fontSize: `${fontSize}px` };

  return (
    <div className={`terminal-frame theme-${theme}`} ref={frameRef}>
      <div className="export-shell">
        <div className="terminal-stack">
          <div className="terminal-window" ref={terminalWindowRef}>
            <div className="title-bar">
              <div className="traffic-lights">
                <div className="dot close" />
                <div className="dot minimize" />
                <div className="dot maximize" />
              </div>
              <div className="title-text">{textOrPlaceholder(titleText)}</div>
            </div>

            <div className="terminal-body">
              <div className="chat-block" style={fontSizeStyle}>
                <div className="chat-icon user">{USER_MARK}</div>
                <div className="chat-copy">
                  <span className="user-highlight">{textOrPlaceholder(userText)}</span>
                </div>
              </div>

              <div className="chat-block" style={fontSizeStyle}>
                <div className="chat-icon claude">{CLAUDE_MARK}</div>
                <div className="chat-copy">{textOrPlaceholder(claudeText)}</div>
              </div>

              <div className="composer">
                <div className="composer-line" />
                <div className="composer-row">
                  <div className="composer-prompt">{USER_MARK}</div>
                  <div className="composer-caret" />
                </div>
                <div className="composer-line" />
                <div className="footer-bar">
                  <div className="footer-left">{textOrPlaceholder(leftSideText)}</div>
                  <div className="watermark">{textOrPlaceholder(watermarkText)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="canvas-brand-lockup">
            <img
              className="canvas-mascot"
              src={mascotSticker}
              alt=""
              aria-hidden="true"
            />
            <div className="canvas-wordmark">
              @claude<span>cooked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
