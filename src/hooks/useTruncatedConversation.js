import { useEffect, useState } from "react";
import {
  CHAT_COPY_MAX_WIDTH,
  CLAUDE_COPY_MAX_HEIGHT,
  TRUNCATION_MARK,
  USER_COPY_MAX_HEIGHT,
} from "../lib/defaults";

const CHAT_LINE_HEIGHT = 1.55;

function createMeasurementRoot(fontSize) {
  const root = document.createElement("div");
  Object.assign(root.style, {
    position: "fixed",
    left: "-10000px",
    top: "0",
    width: `${CHAT_COPY_MAX_WIDTH}px`,
    padding: "0",
    margin: "0",
    visibility: "hidden",
    pointerEvents: "none",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    lineHeight: String(CHAT_LINE_HEIGHT),
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: `${fontSize}px`,
  });

  return root;
}

function createMeasurementTarget(fontSize, variant) {
  const root = createMeasurementRoot(fontSize);

  if (variant === "user") {
    const highlight = document.createElement("span");
    Object.assign(highlight.style, {
      display: "inline",
      padding: "0.12em 0.34em 0.18em",
      boxDecorationBreak: "clone",
      WebkitBoxDecorationBreak: "clone",
    });

    root.appendChild(highlight);
    document.body.appendChild(root);
    return {
      root,
      contentNode: highlight,
    };
  }

  document.body.appendChild(root);
  return {
    root,
    contentNode: root,
  };
}

function buildTruncatedText(text, length) {
  const trimmed = text.slice(0, length).replace(/\s+$/u, "");
  return trimmed ? `${trimmed}${TRUNCATION_MARK}` : TRUNCATION_MARK;
}

function fitsWithinHeight(target, text, maxHeight) {
  target.contentNode.textContent = text;
  return target.root.scrollHeight <= maxHeight;
}

function truncateToFit(target, text, maxHeight) {
  if (!text) return text;
  if (fitsWithinHeight(target, text, maxHeight)) return text;

  let low = 0;
  let high = text.length;
  let best = TRUNCATION_MARK;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const candidate = buildTruncatedText(text, mid);

    if (fitsWithinHeight(target, candidate, maxHeight)) {
      best = candidate;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return best;
}

export function useTruncatedConversation({ userText, claudeText, fontSize }) {
  const [truncatedText, setTruncatedText] = useState({
    userText,
    claudeText,
  });

  useEffect(() => {
    let cancelled = false;

    async function measureConversation() {
      if (typeof document === "undefined") return;

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const userTarget = createMeasurementTarget(fontSize, "user");
      const claudeTarget = createMeasurementTarget(fontSize, "claude");

      try {
        const nextText = {
          userText: truncateToFit(userTarget, userText, USER_COPY_MAX_HEIGHT),
          claudeText: truncateToFit(claudeTarget, claudeText, CLAUDE_COPY_MAX_HEIGHT),
        };

        if (!cancelled) {
          setTruncatedText(nextText);
        }
      } finally {
        userTarget.root.remove();
        claudeTarget.root.remove();
      }
    }

    measureConversation();

    return () => {
      cancelled = true;
    };
  }, [claudeText, fontSize, userText]);

  return truncatedText;
}
