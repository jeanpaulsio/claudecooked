import html2canvas from "html2canvas";
import { EXPORT_SIZE } from "./defaults";

const BACKGROUND_BY_THEME = {
  light: "#f6f1e8",
  dark: "#0b0d12",
};

function nextAnimationFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

export async function exportCanvas({ frameEl, terminalWindowEl, theme }) {
  if (!frameEl) return false;

  let restoreWidth = "";
  let restoreHeight = "";
  let restoreMinWidth = "";

  try {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    await nextAnimationFrame();
    await nextAnimationFrame();

    if (terminalWindowEl) {
      const measuredWidth = Math.max(
        terminalWindowEl.offsetWidth,
        terminalWindowEl.scrollWidth
      );
      const measuredHeight = Math.max(
        terminalWindowEl.offsetHeight,
        terminalWindowEl.scrollHeight
      );

      restoreWidth = terminalWindowEl.style.width;
      restoreHeight = terminalWindowEl.style.height;
      restoreMinWidth = terminalWindowEl.style.minWidth;
      terminalWindowEl.style.width = `${Math.ceil(measuredWidth)}px`;
      terminalWindowEl.style.height = `${Math.ceil(measuredHeight)}px`;
      terminalWindowEl.style.minWidth = `${Math.ceil(measuredWidth)}px`;
    }

    const canvas = await html2canvas(frameEl, {
      backgroundColor: BACKGROUND_BY_THEME[theme] || BACKGROUND_BY_THEME.dark,
      scale: 2,
      width: EXPORT_SIZE,
      height: EXPORT_SIZE,
      scrollX: 0,
      scrollY: 0,
      windowWidth: EXPORT_SIZE,
      windowHeight: EXPORT_SIZE,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = `claudecooked_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    return true;
  } finally {
    if (terminalWindowEl) {
      terminalWindowEl.style.width = restoreWidth;
      terminalWindowEl.style.height = restoreHeight;
      terminalWindowEl.style.minWidth = restoreMinWidth;
    }
  }
}
